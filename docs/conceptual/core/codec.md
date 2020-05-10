---
title: SCALE编解码器
---

SCALE (简单串行聚合小端 Simple Concatenated Aggregate Little-Endian) 编解码器是一个轻量级,
高效, 二进制序列化和反序列化的编解码器.

它是为了在资源受限的执行环境中实现数据高效、免拷贝编解码而设计的。例如： [Substrate
runtime](conceptual/runtime/index.md)。 它不是任何方式的自我描述并且会假设解码环境包含了所有类型的编码数据知识。

## substrate的SCALE编解码器

Substrate使用了[`parity-scale-codec`](https://github.com/paritytech/parity-scale-codec)：一种rust实现的SCALE编解码器。 这个库和SCALE编解码器对Substrate和区块链系统是有利的因为：

* 它相对于一般的序列化框架例如[serde](https://serde.rs/)来说，是轻量级的。而一般的框架显著增加了样板使得二进制的大小膨胀。
* 它不使用Rust标准库，因此能够为Substrate runtime编译成Wasm。
* 它是使用Rust构建，那么对于新的类型需要派生编解码逻辑的时候有更好的支持（译者注：因为Substrate也是使用rust构建的）：
  ```
  #[derive(Encode, Decode)]
  ```
定义Substrate使用的编码规范而不是重用已有的Rust编解码器库是很重要的。因为这个新的编解码器需要被其他想要支持互操作性的平台和语言重新实现。


## 编解码器定义

这里你能找到SCALE编解码器怎样为不同类型的数据编码的。

### 固定宽度的整数

基础整数（integers）类型被编码成固定宽度的小端（little-endian）格式。

#### 例子

- `有符号8位整数69`: `0x45`
- `无符号16位整数42`: `0x2a00`
- `无符号32位整数16777215`: `0xffffff00`

### 紧凑/一般的整数类型

“紧凑”（"compact"）的或者一般的整数编码足够编码大整数（最大到2**536）而且比起固定宽度的值能更高效的编码大多数值。 (然而对于单字节值，固定宽度的整数重来不更坏)

最小的两位表示模式：

- `0b00`: 单字节模式：高六位是值的LE编码（合法的取值范围0-63）。
- `0b01`: 双字节模式：高六位和紧接着的一个字节是LE编码（合法的取值范围`64-(2**14-1)`）。
- `0b10`: 四字节模式：高六位和紧接着的三个字节是LE编码（合法的取值范围`(2**14-1)-(2**30-1)`）。
- `0b11`: 大整数模式：高六位是代表下面的字节数，小于四个。接下来的字节包括了值，为LE编码。最高位必须不为0。合法的取值范围是`(2**30-1)-(2**536-1)`。

#### 例子

- `无符号整数0`: `0x00`
- `无符号整数1`: `0x04`
- `无符号整数42`: `0xa8`
- `无符号整数69`: `0x1501`

错误:

- ~~`0x0100`: 用模式1零编码。

### Boolean

布尔值用单字节的最小有效位编码。

#### 例子

- `boolean false`: `0x00`
- `boolean true`: `0x01`

### 可选项

特殊类型的1或者0值。编码成：

- `0x00` 如果是 `None` ("empty" 或者 "null")。
- `0x01` 如果是 `Some`，则紧接着是编码值。

作为一个例外，倘若是boolean类型，永远是一个字节：

- `0x00` 如果是 `None` ("empty" 或者 "null")。
- `0x01` 如果是 `false` 值。
- `0x02` 如果是 `true` 值。

### 矢量数据 （lists，series，sets）

一堆相同类型的值被编码，前缀是有若干项的一个*紧凑*编码，紧接着是每个项的依次串行编码。

#### 例子

无符号的16位整数矢量：

```
[4, 8, 15, 16, 23, 42]
```

SCALE字节：

```
0x18040008000f00100017002a00
```

### 元组

一系列固定大小的值，每一个可能不一样但是事先确定并且类型固定。这个单纯是每个编码值的串行。

#### 例子

紧凑无符号整数和布尔的元组:

`(3, false)`: `0x0c00`

### 数据结构

对于结构来说，值是命名的，但是和编码无关（名字被忽略的 - 只有顺序是要紧的）。 **所有容器连续存储了元素。元素的顺序不确定，取决于容器，并且不依赖于解码。**

这明确意味着把一些字节组解码成特定的强制顺序的结构然后重新编码，可能会导致产生字节组不同于原始被解码的字节组。

#### 例子

想象下`SortedVecAsc<u8>`结构永远有以上升顺序排列的字节元素并且你有`[3, 5, 2, 8]`，第一个元素代表接下来的字节的数量(也就是说 `[3, 5, 2]`是不合法的)。

`SortedVecAsc::from([3, 5, 2, 8])`会被解码成`[3, 2, 5, 8]`，这就不匹配原始编码了。

### 枚举（标签联合）

一个固定数量的变量，每一个都是互相排斥的并且暗示了下面的值或者一系列的值。

第一个字节代表变量的索引。任何之后的字节被用来编码任何变量意指的数据。因此，只支持不超过256个变量。

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

Parity的SCALE编解码器目前有以下的实现：

* Rust:
  [`paritytech/parity-scale-codec`](https://github.com/paritytech/parity-scale-codec)
* Python:
  [`polkascan/py-scale-codec`](https://github.com/polkascan/py-scale-codec)
* Golang: [`ChainSafe/gossamer`](https://github.com/ChainSafe/gossamer)
* C++: [`soramitsu/scale`](https://github.com/soramitsu/scale)
* JavaScript: [`polkadot-js/api`](https://github.com/polkadot-js/api)

## 下一步

### 学习更多

TODO

### 例子

TODO

### 参考

* 查看[`parity-scale-codec`](https://substrate.dev/rustdocs/master/parity_scale_codec/index.html)的参考文档。

* 查看附加的编码章节[Polkadot runtime environment
  specification](https://github.com/w3f/polkadot-spec/blob/master/runtime-environment-spec/polkadot_re_spec.pdf).
