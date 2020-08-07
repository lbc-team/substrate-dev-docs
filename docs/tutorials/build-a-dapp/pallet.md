---
title: 定制 Pallet
---


Substrate 运行时（Runtime）由 [FRAME pallet](https://learnblockchain.cn/docs/substrate/docs/knowledgebase/runtime/frame/) 组成。 你可以将这些 pallet 视为一个个（实现好的）区块链功能的独立逻辑（模块）！ Substrate 已经提供了许多预先构建的pallet，可以让我们在构建基于 FRAME 的 Runtime 时使用。



![Runtime 组成](assets/tutorials/build-a-dapp/runtime.png)

举例来说，FRAME 包含的 [Balances](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_balances/) pallet，它可以用来管理你的区块链上的所有账户下基础货币的余额，如果你想在链上加入智能合约功能，仅需要简单的引入
[Contracts](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_contracts/) pallet 。



甚至可以通过添加诸如 [Democracy](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_democracy/), [Elections](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_elections/), 和 [Collective](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_collective/) 之类的 pallet，将链上治理的内容添加到你的区块链中 



本教程的目的是学会如何创建自己的Substrate pallet 以及包含在自定义区块链中！ `substrate-node-template` 带有一个模板pallet ，我们将在其之上构建自定义逻辑。



## 文件结构

现在，我们将修改`substrate-node-template`以引入存证 pallet 的基本功能。


在你常用的文本编辑器里打开 `substrate-node-template` 。然后打开文件`pallets/template/src/lib.rs`

```
substrate-node-template
|
+-- runtime
|
+-- pallets
|   |
|   +-- template
|       |
|       +-- Cargo.toml    <--  此文件有一处修改
|       |
|       +-- src
|           |
|           +-- lib.rs     <-- 大部分修改在此文件
|           |
|           +-- mock.rs
|           |
|           +-- tests.rs
|
+-- scripts
|
+-- node
|
+-- ...
```



你将看到一些预先编写的代码，它们作为新pallet的模板。 你可以阅读这些文件（如果你想愿意的话）后删除内容，因为我们要从头开始实现。 将来在编写自己的pallet 时，您可能会发现此模板 pallet 中的脚手架很有用。



## 构建全新的Pallet

从较高的层次上（代码框架）看，Substrate pallet可以分为六个部分：

```rust
// 1. 引入包
use frame_support::{decl_module, decl_storage, decl_event, decl_error, dispatch};
use frame_system::{self as system, ensure_signed};

// 2. Pallet 配置
pub trait Trait: system::Trait { /* --snip-- */ }

// 3. 定义 Pallet 存储项
decl_storage! { /* --snip-- */ }

// 4. 定义 Pallet 事件
decl_event! { /* --snip-- */ }

// 5. 定义 Pallet 错误
decl_error! { /* --snip-- */ }

// 6. 定义 Pallet 可调用函数
decl_module! { /* --snip-- */ }
```



如果你做过其他的区块链开发，诸如 事件（event），存储（storage）和可调用函数（callable function）可能会让你觉得很熟悉。



我们将向您展示基本的“存在性证明” Pallet 中所有这些组件都长什么样。



### 导入及依赖

由于导入非常无聊，因此你可以首先以下内容将其复制到空的`lib.rs`文件头部：

```rust
#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
	decl_module, decl_storage, decl_event, decl_error, ensure, StorageMap
};
use frame_system::{self as system, ensure_signed};
use sp_std::vec::Vec;
```



大多数导入（import）是直接可用，因为它们已在我们刚刚删除pallet代码中使用。 但是，`sp_std`不可用，我们需要将其列为依赖项（dependency）。



**添加** 以下代码块到 `pallets/template/Cargo.toml` 文件.

```toml
[dependencies.sp-std]
git = 'https://github.com/paritytech/substrate.git'
default-features = false
tag = 'v2.0.0-rc4'
version = '2.0.0-rc4'
```

然后， **修改** 已有的 `[features]` 块，修改完是这样子，最后一行是新加的

```toml
[features]
default = ['std']
std = [
    'codec/std',
    'frame-support/std',
    'frame-system/std',
    'sp-std/std',          <-- 这一行是新加的
]
```

### 配置 Pallet 

每个pallet都要配置 trait 。 目前，我们唯一要为 pallet 配置的是：pallet 会触发一些事件。



```rust
/// pallet 的 trait 配置.
pub trait Trait: system::Trait {
    /// 事件类型
    type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
}
```

### 定义 Pallet 事件

在配置好 pallet 可发出事件类型后，让我们继续定义需要哪些事件：

> 译者注：区块链通过事件把区块链上（某时刻）发生的事情通知到外部。

```rust
// pallet 的事件.
decl_event! {
    pub enum Event<T> where AccountId = <T as system::Trait>::AccountId {
        /// 在声明存证后触发该事件。 
        ClaimCreated(AccountId, Vec<u8>),
        /// 在撤销存证后触发该事件。
        ClaimRevoked(AccountId, Vec<u8>),
    }
}
```

我们的 pallet 只会有两个事件： 

1. 当新存证添加到区块链时触发事件。
2. 当存证撤销时触发事件。


事件可以包含一些附加数据（通过事件的参数），在当前存证案例下，每个事件还包含显示触发事件的人（`AccountId`）和正在存储或删除的证明数据（如Vec <u8>）。



### 定义 Pallet 错误

我们先前定义的事件用来指示什么时够对 pallet 的调用成功了。

同样的，如果调用失败了，以及为什么失败同样需要指示。


```rust
//  pallet 错误.
decl_error! {
	pub enum Error for Module<T: Trait> {
		/// 存证已经被声明了
		ProofAlreadyClaimed,
		/// 存证不存在，因此不能被撤销
		NoSuchProof,
		/// 存证被另一个用户声明，因此调用者不能撤销
		NotProofOwner,
	}
}
```

当用户尝试声明新的存证时，可能会出现第一个错误。因为用户不能声明已经声明的存证。 尝试撤销存证时，可能会发生后两种情况。


### 定义 Pallet 存储项

要添加一个新的存证到区块链上时，就要将其存储到 pallet 的存储里面。
我们这里创建一个[hash map](https://en.wikipedia.org/wiki/Hash_table)来存储存证及对应值。
为每个存证保存其所有者及存证声明时的区块号


```rust
// pallet 存储项
decl_storage! {
    trait Store for Module<T: Trait> as TemplateModule {
        /// 存储的存储项
        /// 一个从存证（Vec<u8>）到所有者及区块号的map
        Proofs: map hasher(blake2_128_concat) Vec<u8> => (T::AccountId, T::BlockNumber);
    }
}
```

如果证明有所有者和区块号，那么我们知道它已被声明！ 否则，就可以去声明它。


### 定义可调用 Pallet 函数

正如我们的pallet事件和错误所暗示的那样，在Substrate pallet中需要有两个可以被用户调用的“可调度函数（dispatchable functions）”：


1. `create_claim()`: 用户声明存证
2. `revoke_claim()`: 存证所有者用来撤销存证

这两个函数的pallet声明如下


```rust
// pallet可调度函数
decl_module! {
    /// module 声明
    pub struct Module<T: Trait> for enum Call where origin: T::Origin {
        // 初始化错误
        // 在节点的metadata中，包含关于错误的信息
        // 仅仅在pallet中需要使用到错误才需要
        type Error = Error<T>;

        // 默认的用来分发事件的函数
        fn deposit_event() = default;

        /// 声明存证函数
        #[weight = 10_000]
        fn create_claim(origin, proof: Vec<u8>) {
            // 验证交易签名及记录函数的调用者
            let sender = ensure_signed(origin)?;

            // 检查存证没有被声明，否则提示错误
            ensure!(!Proofs::<T>::contains_key(&proof), Error::<T>::ProofAlreadyClaimed);

            // 调用 `system` pallet 获得当前区块号
            let current_block = <system::Module<T>>::block_number();

            // 保存调用者(sender) 和 当前区块号
            Proofs::<T>::insert(&proof, (&sender, current_block));

            // 触发事件
            Self::deposit_event(RawEvent::ClaimCreated(sender, proof));
        }

        /// 撤销存证函数
        #[weight = 10_000]
        fn revoke_claim(origin, proof: Vec<u8>) {
            // 确定谁在调用函数
            let sender = ensure_signed(origin)?;

            // 检查存证是否声明过
            ensure!(Proofs::<T>::contains_key(&proof), Error::<T>::NoSuchProof);

            // 获得存证的所有者
            let (owner, _) = Proofs::<T>::get(&proof);

            // 检查调用者是否是所有者
            ensure!(sender == owner, Error::<T>::NotProofOwner);

            // 删除存证项
            Proofs::<T>::remove(&proof);

            // 触发事件
            Self::deposit_event(RawEvent::ClaimRevoked(sender, proof));
        }
    }
}
```

> 在此处看到的函数没有明确声明返回类型。实际上他们都会返回 [`DispatchResult`](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_support/dispatch/type.DispatchResult.html).
> 返回类型是通过 `decl_module!` 宏添加的。

## 编译 Pallet

在你将pallet所有代码片段正确复制到`pallets/template/lib.rs`文件之后，你应该能够重新编译节点而不会提示警告或错误。
 在`substrate-node-template`代码库的根目录中运行此命令。


```bash
cargo build --release
```

编译完之后，现在可以启动节点：

```bash
# purge-chain 用来清除之前运行的老数据
# 在提示中输入 `y`
./target/release/node-template purge-chain --dev

# 在“开发”模式下重新运行节点
./target/release/node-template --dev
```

现在是时候与我们的存证pallet进行交互了！

