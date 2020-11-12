---
title: "添加一个 Pallet"
---

[Substrate node template(节点模板)](https://github.com/substrate-developer-hub/substrate-node-template) 提供了一个最小的可工作的运行时，你可以使用它来快速开始构建自己的自定义区块链。 但是，为保持精炼，它并不包括[FRAME](../../knowledgebase/runtime/frame)中的大多数 Pallet 。

本教程将向你展示如何将[合约 pallet](https://substrate.dev/rustdocs/v2.0.0) 添加到运行时（runtime）中，以允许你的区块链支持Wasm智能合约，但是请注意，为了正确使用，每个pallet所需的特定配置设置会略有不同。

## 安装节点模板(Node Template) 

如果你完成了前面的[创建第一条 Substrate 区块链](../create-your-first-substrate-chain/)，你应该已经编译好了 [Substrate Node Template](https://github.com/substrate-developer-hub/substrate-node-template)  `v2.0.0` 版本，如果还没有，需要先完成前面的教程。


> 有经验的开发人员会想跳过该教程，那你参考 readme 指引可以安装节点模板

## 文件结构

我们将修改 `substrate-node-template` 来引入合约 pallet.

用编辑器打开 `substrate-node-template，我们将编辑以下两个文件：
`runtime/src/lib.rs` 和 `runtime/Cargo.toml`.

```
substrate-node-template
|
+-- runtime
|   |
|   +-- Cargo.toml    <-- 一处更改
|   |
|   +-- build.rs
|   |
|   +-- src
|       |
|       +-- lib.rs     <-- 大量修改
|
+-- pallets
|
+-- scripts
|
+-- node            <-- 在这个目录下修改
|
+-- ...
```

## 导入 Pallet 包（crate）

添加合约 pallet 的第一件事是在运行时的 `Cargo.toml` 文件中导入 `pallet-contracts` 包。

如果你想查看原始引用方法，请查看[其官方文档](https://doc.rust-lang.org/cargo/reference/index.html)



打开 `substrate-node-template/runtime/Cargo.toml` 后，你会看到运行时所有的依赖列表，例如：它依赖[Balances pallet](https://substrate.dev/rustdocs/v2.0.0):

**`runtime/Cargo.toml`**

```TOML
[dependencies]
#--snip--
pallet-balances = { default-features = false, version = '2.0.0' }
```

### 包特性（Crate Features）

导入pallet 包时需要注意的一件事是确保正确设置包的 `features`。

在上面的代码片段中，你会注意到我们设置了 `default_features = false`。 如果你更仔细地浏览 `Cargo.toml` 文件，你会发现类似：


**`runtime/Cargo.toml`**

```TOML
[features]
default = ['std']
std = [
	'codec/std',
	'frame-executive/std',
	'frame-support/std',
	'frame-system/std',
	'frame-system-rpc-runtime-api/std',
	'pallet-balances/std',
	#--snip--
]
```

第二行将运行时 crate 的 `default` 特性定义为`std`（译者注：表示 Rust 标准库）。 你可以想象，每个 pallet crate 都有一个类似的配置，定义了 crate 的默认特性 。 特性的定义会决定下游依赖项应该使用的特性。 例如，上面的代码片段应解读为：


>  Substrate 运行时默认特性是`std`。当运行时的 `std` 特性可用时，`parity-scale-codec`, `primitives`, `client` 和其他列出的依赖也应该使用他们的 `std` 特性。

在编译 Native版本（支持 Rust  [`std`](https://doc.rust-lang.org/std/) ） 和 Wasm版本（仅支持 [`no_std`](https://rust-embedded.github.io/book/intro/no-std.html)），feature 配置非常重要的。

> 译者注：可以把 no_std 简单理解为为了在嵌入式环境下运行，精简为只包含部分核心的`std`, 并包含了一些底层相关的代码。

我们可以打开项目文件，来查看这些特性实际上如何在运行时代码中使用：



**`runtime/src/lib.rs`**

```rust
//!  Substrate Node Template 运行时. 用 `#[no_std]` 编译, 用于 Wasm 版本.

#![cfg_attr(not(feature = "std"), no_std)]
// `construct_runtime!` 进行了大量递归，并要求我们将限制增加到256。
#![recursion_limit="256"]

// 使 WASM 二进制可用
#[cfg(feature = "std")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));

// --省略--
```

你可以看到，在文件的顶部，我们定义了当_不_使用`std`特性时，使用`no_std`。 接下来几行，可以在 `wasm_binary.rs` 导入上方看到 `#[cfg(feature = "std")]`，这是一个标志，表示在启用 `std` 特性时仅导入WASM二进制文件。


### 导入合约 Pallet 包（crate)

好了, 现在我们有了 crate 特性的基本的认识，开始实际导入合约 pallet。  合约 pallet 也许是 FRAME 中最复杂的pallet， 因此，这为添加其他pallet时可能涉及的一些棘手问题提供了一个很好的例子。 

首先，我们将通过简单地复制现有 pallet 并更改值来添加新的依赖。

因此，根据上面导入的`balances` ，`contracts` 的导入将类似于：


**`runtime/Cargo.toml`**

```TOML
[dependencies]
#--snip--
pallet-contracts = { version = '2.0.0', default_features = false }
pallet-contracts-primitives = { version = '2.0.0', default_features = false }
```

与其他 pallets 一样，合约 pallet 具有 `std` 特性。 当运行时使用其自己的 `std` 特性构建时，我们应该构建其 `std` 特性。 将以下两行添加到运行时的`std` 特性中。


**`runtime/Cargo.toml`**

```TOML
[features]
default = ['std']
std = [
    #--省略--
    'contracts/std',
    'contracts-primitives/std',
    #--省略--
]
```

现在是时候检查一下是否可以正确编译所有内容：


```bash
cargo check
```

## 添加合约 Pallet

现在，我们已经成功导入了合约 Pallet 包（crate），我们需要将其添加到运行时中。

### 实现合约 Trait

每个 pallet 都称为`Trait` 的配置 trait，必须在运行时中实现。


要弄清楚我们需要为该 pallet 具体实现什么，你可以看一下FRAME [`contracts::Trait` 文档](https://substrate.dev/rustdocs/v2.0.0/pallet_contracts/trait.Trait.html) 。

对于我们的运行时，实现将如下所示：

**`runtime/src/lib.rs`**

```rust

// 时间单位以区块数定义。 
/* --省略-- */

/*** 添加的代码块 ***/
// Contracts 货币单位.
pub const MILLICENTS: Balance = 1_000_000_000;
pub const CENTS: Balance = 1_000 * MILLICENTS;
pub const DOLLARS: Balance = 100 * CENTS;
/*** 结束添加代码块 ***/
```

```rust

impl timestamp::Trait for Runtime {
    /* --省略-- */
}

/*** 添加代码块 ***/
parameter_types! {
	pub const TombstoneDeposit: Balance = 16 * MILLICENTS;
	pub const RentByteFee: Balance = 4 * MILLICENTS;
	pub const RentDepositOffset: Balance = 1000 * MILLICENTS;
	pub const SurchargeReward: Balance = 150 * MILLICENTS;
}

impl pallet_contracts::Trait for Runtime {
	type Time = Timestamp;
	type Randomness = RandomnessCollectiveFlip;
	type Currency = Balances;
	type Event = Event;
	type DetermineContractAddress = pallet_contracts::SimpleAddressDeterminer<Runtime>;
	type TrieIdGenerator = pallet_contracts::TrieIdFromParentCounter<Runtime>;
	type RentPayment = ();
	type SignedClaimHandicap = pallet_contracts::DefaultSignedClaimHandicap;
	type TombstoneDeposit = TombstoneDeposit;
	type StorageSizeOffset = pallet_contracts::DefaultStorageSizeOffset;
	type RentByteFee = RentByteFee;
	type RentDepositOffset = RentDepositOffset;
	type SurchargeReward = SurchargeReward;
	type MaxDepth = pallet_contracts::DefaultMaxDepth;
	type MaxValueSize = pallet_contracts::DefaultMaxValueSize;
	type WeightPrice = pallet_transaction_payment::Module<Self>;
}
/*** 结束添加代码块 ***/
```

我们将使用 `type DetermineContractAddress` 作为实例探索一下细节，你可以从文档[ `DetermineContractAddress` 文档](https://substrate.dev/rustdocs/v2.0.0/pallet_contracts/trait.Trait.html#associatedtype.DetermineContractAddress)
查看到它需要 trait `ContractAddressFor`。 Contracts pallet 本身用`contract::SimpleAddressDeterminator`的这个trait实现了一个类型，因此我们可以使用该实现来满足我们的 `contracts::Trait`。 在这一点上，如果有什么不明白，或是想深入理解，我真的建议你探索[Contracts pallet](https://github.com/paritytech/substrate/blob/v2.0.0/frame/contracts/src/lib.rs)源码。


### 添加合约到 `construct_runtime!` 宏

下一步，我们需要把pallet添加到 `construct_runtime!` 宏。 为此，我们需要确定 pallet 公开的类型，以便我们可以告之运行时类型的存在。 可能的类型的完整列表可以在[`construct_runtime！`宏文档](https://substrate.dev/rustdocs/v2.0.0/frame_support/macro.construct_runtime.html)中找到。

如果我们仔细查看Contracts pallet，我们知道它具有：


- **存储** 模块: 因为它使用了 `decl_storage!` 宏。
- **事件** 模块: 因为它使用了 `decl_event!` 宏。
- 可**调用**函数: 因为它在 `decl_module!` 宏有可调用的函数。
- **配置**值: 因为 `decl_storage!` 宏有 `config()` 参数。
- 来自 `decl_module!` 宏的 **Module** 类型。

因此，我们添加这个 pallet，就像这样：

**`runtime/src/lib.rs`**

```rust
construct_runtime!(
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic
    {
        /* --snip-- */

        /*** 添加这行 ***/
        Contracts: contracts::{Module, Call, Config, Storage, Event<T>},
    }
);
```

请注意，并非所有的pallet都会公开暴露所有这些运行时类型，有些可能会公开很多！ 总是需要你查看pallet的源代码或文档，以确定哪些是你需要公开的类型。

到目前为止，是检查运行时是否能正确编译的另一个好时机。 尽管运行时应该编译，但整个节点还不能。 因此，我们将使用以下命令仅检查
运行时。



```bash
cargo check -p node-template-runtime
```

### 导出合约 API

某些pallet（包括Contract pallet）公开了自定义运行时API和RPC节点。 对于Contract pallet来说，这使得可以从链外读取合约状态。


在我们的链上使用是不要求启用Contract pallet上的RPC调用。 但是，我们将这样做以在不进行交易的情况下调用节点的存储。


我们从`Cargo.toml`中添加所需的API依赖开始。


**`runtime/Cargo.toml`**

```TOML
[dependencies]
#--snip--
pallet-contracts-rpc-runtime-api = { version = '0.8.0', default-features = false }
```

**`runtime/Cargo.toml`**

```TOML
[features]
default = ['std']
std = [
    #--忽略--
    'contracts-rpc-runtime-api/std',
]
```

为了获取合约变量的状态，我们需要调用 getter 函数，它将返回执行状态的 `ContractExecResult` 包装

我们需要将返回类型添加到运行时。 用其他`use`语句来添加。


**`runtime/src/lib.rs`**

```rust
/*** 添加这行 ***/
use contracts_rpc_runtime_api::ContractExecResult;
/* --忽略-- */
```

现在，我们准备实现合约运行时API。  这是在`impl_runtime_apis！`宏中在运行时即将结束试进行发生的。


```rust
impl_runtime_apis! {
   /* --忽略-- */

   /*** 添加代码块 ***/
    impl contracts_rpc_runtime_api::ContractsApi<Block, AccountId, Balance, BlockNumber>
		for Runtime
	{
		fn call(
			origin: AccountId,
			dest: AccountId,
			value: Balance,
			gas_limit: u64,
			input_data: Vec<u8>,
		) -> ContractExecResult {
			let (exec_result, gas_consumed) =
				Contracts::bare_call(origin, dest.into(), value, gas_limit, input_data);
			match exec_result {
				Ok(v) => ContractExecResult::Success {
					flags: v.flags.bits(),
					data: v.data,
					gas_consumed: gas_consumed,
				},
				Err(_) => ContractExecResult::Error,
			}
		}

		fn get_storage(
			address: AccountId,
			key: [u8; 32],
		) -> pallet_contracts_primitives::GetStorageResult {
			Contracts::get_storage(address, key)
		}

		fn rent_projection(
			address: AccountId,
		) -> pallet_contracts_primitives::RentProjectionResult<BlockNumber> {
			Contracts::rent_projection(address)
		}
	}
   /*** End Added Block ***/
}
```

这是另一个去检查运行时是否正确编译好时机。


```bash
cargo check -p node-template-runtime
```

## 升级外部节点

至此，我们已经完成了向运行时添加pallet的工作。 现在，我们将注意力转向外部节点，外部节点通常需要一些相应的更新。 对于合约 pallet，我们将添加自定义RPC 和创始配置。


### 添加 RPC 端点

由于公开了适当的运行时API。 现在，我们将RPC添加到节点的服务中，以调用该运行时API。 因为我们现在在外部节点上工作，所以我们没有构建为`no_std`并且我们不必维护专用的`std`功能。


**`node/Cargo.toml`**

```toml
[dependencies]
jsonrpc-core = '15.0.0'
structopt = '0.3.8'
#--snip--
# *** Add this 2 lines ***
pallet-contracts = '2.0.0'
pallet-contracts-rpc = '0.8.0'
```


Substrate 提供了一个RPC与我们的节点进行交互。 但是，默认情况下，它不包含对合约Pallet的访问。 要与该Pallet交互，我们必须扩展现有的RPC并添加合约Pallet及其API。


**`node/src/rpc.rs`**

```
use node_template_runtime::{opaque::Block, AccountId, Balance, Index, BlockNumber};
use pallet_contracts_rpc::{Contracts, ContractsApi};
```

```rust
/// Instantiate all full RPC extensions.
pub fn create_full<C, P>(
    deps: FullDeps<C, P>,
) -> jsonrpc_core::IoHandler<sc_rpc::Metadata> where
    /* --snip-- */
    C: Send + Sync + 'static,
    C::Api: substrate_frame_rpc_system::AccountNonceApi<Block, AccountId, Index>,
    /*** Add This Line ***/
    C::Api: pallet_contracts_rpc::ContractsRuntimeApi<Block, AccountId, Balance, BlockNumber>,
    /* --snip-- */
{
    /* --snip-- */

    // Extend this RPC with a custom API by using the following syntax.
    // `YourRpcStruct` should have a reference to a client, which is needed
    // to call into the runtime.
    // `io.extend_with(YourRpcTrait::to_delegate(YourRpcStruct::new(ReferenceToClient, ...)));`

    /*** Add This Block ***/
    io.extend_with(
        ContractsApi::to_delegate(Contracts::new(client.clone()))
    );
    /*** End Added Block ***/
    io
}
```

### 创始块配置

不是所有的 pallet 有创始配置，但如果你的需要，你需要通过文档了解它，例如[`pallet_contracts::GenesisConfig` 文档](https://substrate.dev/rustdocs/v2.0.0/pallet_contracts/struct.GenesisConfig.html) 
描述了你需要为合约pallet定义的所有字段。


创始配置通过 `node/src/chain_spec.rs` 控制，我们需要修改此文件以在顶部包含`ContractsConfig`类型和合约价格单位：


**`node/src/chain_spec.rs`**

```rust
use node_template_runtime::ContractsConfig;
```

然后在 `testnet_genesis` 函数中，我们需要将合约配置添加到返回的GenesisConfig对象如下：

> 重要：我们正在从函数参数中获取值 `_enable_println` 。 确保删除参数定义之前的下划线。


```rust
/// Configure initial storage state for FRAME modules.
fn testnet_genesis(
    wasm_binary: &[u8],
    initial_authorities: Vec<(AuraId, GrandpaId)>,
    root_key: AccountId,
    endowed_accounts: Vec<AccountId>,
    enable_println: bool, // Update this line
) -> GenesisConfig {
    GenesisConfig {
        /* --snip-- */

        /*** Add This Block ***/
        pallet_contracts: Some(ContractsConfig {
            current_schedule: pallet_contracts::Schedule {
                    enable_println,
                    ..Default::default()
            },
        }),
        /*** End Added Block ***/
    }
}
```

## 启动升级的链

现在，你可以编译并运行具有合约功能的节点了。 在发布（release）模式下使用以下命令编译节点


```bash
cargo build --release
```

在运行链之前，我们首先需要清除链以删除旧的运行时逻辑，并为合约pallet初始化创始配置。 不清除链条的情况升级也可行的，但超出了本教程的范围。


```bash
# Run a temporary node in development mode
./target/release/node-template --dev --tmp
```

## 添加其他的 FRAME pallets


在本教程中，我们专门介绍了如何导入合约pallet，但是，如教程开头所述，每个pallet都会有所不同。 不用担心，你始终可以参考[演示的Substrate节点运行时](https://github.com/paritytech/substrate/blob/v2.0.0/bin/node/runtime/)，该运行时几乎包括FRAME中的每个pallet。


在 Substrate 节点运行时的 `Cargo.toml` 文件，你将看到一个有关如何导入每个不同pallet的示例，在`lib.rs`文件中，你将找到如何将每个pallet添加到运行时。 你基本上可以将这里所做的复制代码到你自己的运行时。


### 了解更多

- [关于在自己的程序包中编写运行时pallet的极简教程](../create-a-pallet/).
- 现在，你的节点可以运行智能合约了，请了解[Substrate ink!  智能合约](../../knowledgebase/smart-contracts/).
  
- [Substrate Recipes](https://substrate.dev/recipes/) 提供了详细的教程关于编写[Runtime APIs](https://substrate.dev/recipes/3-entrees/runtime-api.html)和[Custom RPCs](https://substrate.dev/recipes/3-entrees/custom-rpc.html) ，就像本教程中探讨的那样。

- 理解 [Chain Spec](../../knowledgebase/integrate/chain-spec) 文件去定制化创世配置。

### 参考手册

- [FRAME `Contracts` Pallet API](https://substrate.dev/rustdocs/v2.0.0/pallet_contracts/index.html)
