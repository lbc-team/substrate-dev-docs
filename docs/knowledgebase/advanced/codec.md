---
title: SCALE编解码器
---

SCALE（全称：Simple Concatenated Aggregate Little-Endian，及简单串行聚合小端) 编解码器是一个轻量级,
高效, 二进制序列化和反序列化的编解码器.


它是为了在资源受限的执行环境中实现数据高效、免拷贝编解码而设计的，例如： [Substrate
runtime](../runtime/)。 它没有任何方式的自我描述并且会假设解码环境包含了所有类型的编码数据知识。


## Substrate 中的SCALE 

Substrate使用了 [`parity-scale-codec`](https://github.com/paritytech/parity-scale-codec)，这是一种rust实现的SCALE编解码器。 这个库和 SCALE 编解码器对Substrate和区块链系统是有利的因为：

- 相对于一般的序列化框架(例如[serde](https://serde.rs/))，它是轻量级的。而一般的序列化框架会增加了大量样板代码（boilerplate）从而膨胀二进制的大小。
- 它不使用Rust标准库，因此能够为Substrate runtime编译成Wasm。
- 它是使用Rust构建，那么对于新的类型需要派生编解码逻辑的时候有更好的支持（译者注：因为Substrate也是使用rust构建的）
  ```
  #[derive(Encode, Decode)]
  ```

定义Substrate使用的编码规范而不是重用已有的Rust编解码器库是很重要的。因为这个编解码器还需要被其他想要支持互操作性的平台和语言重新实现。


## 编解码器规范

这里你能找到SCALE编解码器怎样为不同类型的数据编码。


### 固定宽度的整数

基础整数（integers）类型被编码成固定宽度的小端（LE：little-endian）格式。

#### 例子

- `有符号8位整数69`: `0x45`
- `无符号16位整数42`: `0x2a00`
- `无符号32位整数16777215`: `0xffffff00`

### 紧凑/一般的整数类型

“紧凑”（"compact"）的或者一般的整数编码足够编码大整数（最大到2\*\*536），而且相比固定宽度编码，其编码大多数值能更高效。 (尽管对于单字节值，固定宽度的整数不会更差)


它使用两个最低有效位表示该模式：
- `0b00`: 单字节模式: 高六位是值的LE编码（合法的取值范围0-63）
- `0b01`: 双字节模式: 高六位和紧接着的一个字节是LE编码（合法的取值范围`64-(2**14-1)`）。
- `0b10`: 四字节模式：高六位和紧接着的三个字节是LE编码（合法的取值范围`(2**14-1)-(2**30-1)`）。
- `0b11`: 大整数模式: 高六位是代表紧接着的字节数，小于四个。接着的字节包括了值，为LE编码。最高位必须不为0。合法的取值范围是 `(2**30-1)-(2**536-1)` 。

#### 例子

- `无符号整数 0`: `0x00`
- `无符号整数 1`: `0x04`
- `无符号整数 42`: `0xa8`
- `无符号整数 69`: `0x1501`

错误:

- ~~`0x0100`: 用模式1零编码~~

### Boolean

布尔值用单字节的最低有效位编码。


#### 例子

- `boolean false`: `0x00`
- `boolean true`: `0x01`

### Option 枚举

具有 0 个或 1 个值的特定类型，编码为：

- `0x00` 如果是 `None` ("empty" 或 "null").
- `0x01` 如果是 `Some`，则紧接着编码值。

一个例外，倘若是boolean类型（泛型参数），则永远是一个字节：

- `0x00` 如果是 `None` ("empty" 或 "null")。
- `0x01` 如果是 `true` 值。
- `0x02` 如果是 `false` 值。

Results 是常用的枚举，指示某些操作是成功还是失败，编码为：


- `0x00` 如果操作成功, 紧接着编码结果值。
- `0x01` 如果操作成功, 紧接着编码错误。

#### 例子

```rust
// A custom result type used in a crate.
let Result = std::result::Result<u8, bool>;
```

- `Ok(42)`: `0x002a`
- `Err(false)`: `0x0100`

### 向量(Vectors：lists, series, sets) 

相同类型的值集合被编码，前缀是集合长度的紧凑编码，紧接着是对每个项依次编码。


#### 例子

无符号的16位整数向量：

```
[4, 8, 15, 16, 23, 42]
```

SCALE字节:

```
0x18040008000f00100017002a00
```

### 字符串(Strings)

字符串是包含UTF8序列的向量。

### 元组(Tuples)

固定长度的序列值，每一个元素可能不一样但是事先确定的并且类型固定。只需要对每个值的依次编码。

#### 举例

紧凑无符号整数和布尔组成的元组:

`(3, false)`: `0x0c00`

### 结构体(Data Structures)


对于结构体来说，值是有命名的，但是和编码无关（名字被忽略的 - 而顺序很关键）。 **所有容器都连续存储元素，而元素的顺序不固定，它取决于容器，并且解码是不能依赖顺序**。


这隐含地意味着将某些字节数组解码为强制顺序的指定结构体，然后对其进行重新编码，可能会导致与解码后的原始字节数组不同。



#### 例子

想象下 `SortedVecAsc<u8>` 结构永远有以升序排列的字节元素并且你有`[3, 5, 2, 8]`, 第一个元素代表接下来的字节的数量(也就是说 `[3, 5, 2]`是不合法的)。

`SortedVecAsc::from([3, 5, 2, 8])` 会被解码成 `[3, 2, 5, 8]`，这就不匹配原始编码了。

### 枚举 (标签联合体tagged-unions)


一个固定数量的变体（variants），每一变体是互相排斥的，并且隐含了一个值或者一系列值。

编码第一个字节标识变体的索引。 任何其他字节都用于编码该变体所隐含的数据。 因此，最多支持256个变体。


#### 例子

```rust
enum IntOrBool {
  Int(u8),
  Bool(bool),
}
```

- `Int(42)`: `0x002a`
- `Bool(true)`: `0x0101`

## 实现

Parity的SCALE编解码器有多个语言的实现，包括由Rust编写并由Parity Technologies维护的参考实现。

- Rust: [`paritytech/parity-scale-codec`](https://github.com/paritytech/parity-scale-codec)
- Python: [`polkascan/py-scale-codec`](https://github.com/polkascan/py-scale-codec)
- Golang: [`itering/scale.go`](https://github.com/itering/scale.go)
- C++: [`soramitsu/scale`](https://github.com/soramitsu/kagome/tree/master/core/scale)
- JavaScript: [`polkadot-js/api`](https://github.com/polkadot-js/api)
- AssemblyScript: [`LimeChain/as-scale-codec`](https://github.com/LimeChain/as-scale-codec)
- Haskell: [`airalab/hs-web3`](https://github.com/airalab/hs-web3/tree/master/src/Codec)
- Java: [`emeraldpay/polkaj`](https://github.com/emeraldpay/polkaj)
- Ruby: [`itering/scale.rb`](https://github.com/itering/scale.rb)

## 参考

- 访问[`parity-scale-codec`](https://substrate.dev/rustdocs/v2.0.0/parity_scale_codec/index.html)参考文档.

- 访问[Polkadot runtime 环境规范](https://github.com/w3f/polkadot-spec/)的辅助编码部分

