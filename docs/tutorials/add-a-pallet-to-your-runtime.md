---
title: "添加一个 Pallet"
---

[Substrate node template(节点模板)](https://github.com/substrate-developer-hub/substrate-node-template) 提供了一个最小的可工作的运行时，你可以使用它来快速开始构建自己的自定义区块链。 但是，为保持精炼，它并不包括[FRAME](../../knowledgebase/runtime/frame)中的大多数 Pallet 。

本教程将向您展示如何将[合约 pallet](https://substrate.dev/rustdocs/v2.0.0-rc4) 添加到运行时（runtime）中，以允许你的区块链支持Wasm智能合约，但是请注意，为了正确使用，每个pallet所需的特定配置设置会略有不同。

## 安装节点模板(Node Template) 

如果你完成了前面的[创建第一条 Substrate 区块链](../create-your-first-substrate-chain/)，你应该已经编译好了 [Substrate Node Template](https://github.com/substrate-developer-hub/substrate-node-template)  `v2.0.0-rc4` 版本，如果还没有，需要先完成前面的教程。


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
+-- node
|
+-- ...
```

## 导入 Pallet 包（crate）

添加合约 pallet 的第一件事是在运行时的 `Cargo.toml` 文件中导入 `pallet-contracts` 包。

如果你想查看原始引用方法，请查看[其官方文档](https://doc.rust-lang.org/cargo/reference/index.html)



打开 `substrate-node-template/runtime/Cargo.toml` 后，你会看到运行时所有的依赖列表，例如：它依赖[Balances pallet](https://substrate.dev/rustdocs/v2.0.0-rc4):

**`runtime/Cargo.toml`**

```TOML
[dependencies.balances]
default-features = false
git = 'https://github.com/paritytech/substrate.git'
package = 'pallet-balances'
tag = 'v2.0.0-rc4'
version = '2.0.0-rc4'
```

### 包特性（Crate Features）

导入pallet 包时需要注意的一件事是确保正确设置包的 `features`。

在上面的代码片段中，您会注意到我们设置了 `default_features = false`。 如果您更仔细地浏览 `Cargo.toml` 文件，您会发现类似：


**`runtime/Cargo.toml`**

```TOML
[features]
default = ['std']
std = [
    'codec/std',
    'client/std',
    'sp-std/std',
    'sp-io/std',
    'balances/std',
    'frame-support/std',
    #--snip--
]
```

第二行将运行时 crate 的 `default` 特性定义为`std`（译者注：表示 Rust 标准库）。 您可以想象，每个 pallet crate 都有一个类似的配置，定义了 crate 的默认特性 。 特性的定义会决定下游依赖项应该使用的特性。 例如，上面的代码片段应解读为：


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

您可以看到，在文件的顶部，我们定义了当_不_使用`std`特性时，使用`no_std`。 接下来几行，可以在 `wasm_binary.rs` 导入上方看到 `#[cfg(feature = "std")]`，这是一个标志，表示在启用 `std` 特性时仅导入WASM二进制文件。


### 导入合约 Pallet 包（crate)

好了, 现在我们有了 crate 特性的基本的认识，开始实际导入合约 pallet。  合约 pallet 也许是 FRAME 中最复杂的pallet， 因此，这为添加其他pallet时可能涉及的一些棘手问题提供了一个很好的例子。 

首先，我们将通过简单地复制现有 pallet 并更改值来添加新的依赖。

因此，根据上面导入的`balances` ，`contracts` 的导入将类似于：


**`runtime/Cargo.toml`**

```TOML
[dependencies.contracts]
git = 'https://github.com/paritytech/substrate.git'
default-features = false
package = 'pallet-contracts'
tag = 'v2.0.0-rc4'
version = '2.0.0-rc4'

[dependencies.contracts-primitives]
git = 'https://github.com/paritytech/substrate.git'
default-features = false
package = 'pallet-contracts-primitives'
tag = 'v2.0.0-rc4'
version = '2.0.0-rc4'
```

与其他 pallets 一样，合约 pallet 具有 `std` 特性。 当运行时使用其自己的 `std` 特性构建时，我们应该构建其 `std` 特性。 将以下两行添加到运行时的`std` 特性中。


**`runtime/Cargo.toml`**

```TOML
[features]
default = ["std"]
std = [
    #--省略--
    'contracts/std',
    'contracts-primitives/std',
    #--省略--
]
```

如果你忘记设置特性，则在构建native二进制文件时会出现类似以下错误：


```rust
error[E0425]: cannot find function `memory_teardown` in module `sandbox`
  --> ~/.cargo/git/checkouts/substrate-7e08433d4c370a21/83a6f1a/primitives/sandbox/src/../without_std.rs:53:12
   |
53 |         sandbox::memory_teardown(self.memory_idx);
   |                  ^^^^^^^^^^^^^^^ not found in `sandbox`

error[E0425]: cannot find function `memory_new` in module `sandbox`
  --> ~/.cargo/git/checkouts/substrate-7e08433d4c370a21/83a6f1a/primitives/sandbox/src/../without_std.rs:72:18
   |
72 |         match sandbox::memory_new(initial, maximum) {
   |

...
```

现在是时候检查一下是否可以正确编译所有内容：


```bash
cargo check
```

## 添加合约 Pallet

现在，我们已经成功导入了合约 Pallet 包（crate），我们需要将其添加到运行时中。
不同的 Pallet 将要求您 `use` 不同的类型。 对于合约Pallet，我们将使用`Schedule`类型。 在运行时开头处，将此行添加到其他`pub use`语句附近。



**`runtime/src/lib.rs`**

```rust
/*** 添加此行 ***/
/// 导入合约 Schedule 类型
pub use contracts::Schedule as ContractsSchedule;
```

### 实现合约 Trait

每个 pallet 都称为`Trait` 的配置 trait，必须在运行时中实现。


要弄清楚我们需要为该 pallet 具体实现什么，您可以看一下FRAME [`contracts::Trait` 文档](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_contracts/trait.Trait.html) 。

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

impl contracts::Trait for Runtime {
	type Time = Timestamp;
	type Randomness = RandomnessCollectiveFlip;
	type Currency = Balances;
	type Event = Event;
	type DetermineContractAddress = contracts::SimpleAddressDeterminer<Runtime>;
	type TrieIdGenerator = contracts::TrieIdFromParentCounter<Runtime>;
	type RentPayment = ();
	type SignedClaimHandicap = contracts::DefaultSignedClaimHandicap;
	type TombstoneDeposit = TombstoneDeposit;
	type StorageSizeOffset = contracts::DefaultStorageSizeOffset;
	type RentByteFee = RentByteFee;
	type RentDepositOffset = RentDepositOffset;
	type SurchargeReward = SurchargeReward;
	type MaxDepth = contracts::DefaultMaxDepth;
	type MaxValueSize = contracts::DefaultMaxValueSize;
	type WeightPrice = transaction_payment::Module<Self>;
}
/*** 结束添加代码块 ***/
```

We will use `type DetermineContractAddress` as an example to go into a bit more detail - you can see
from
[the `DetermineContractAddress` documentation](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_contracts/trait.Trait.html#associatedtype.DetermineContractAddress)
that it requires the trait `ContractAddressFor`. The Contracts pallet itself implements a type with
this trait in `contract::SimpleAddressDeterminator`, thus we can use that implementation to satisfy
our `contracts::Trait`. At this point, I really recommend you explore the source code of the
[Contracts pallet](https://github.com/paritytech/substrate/blob/v2.0.0-rc4/frame/contracts/src/lib.rs)
if things don't make sense or you want to gain a deeper understanding.

### Adding Contracts to the `construct_runtime!` Macro

Next, we need to add the pallet to the `construct_runtime!` macro. For this, we need to determine
the types that the pallet exposes so that we can tell the our runtime that they exist. The complete
list of possible types can be found in the
[`construct_runtime!` macro documentation](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_support/macro.construct_runtime.html).

If we look at the Contracts pallet in detail, we know it has:

- Module **Storage**: Because it uses the `decl_storage!` macro.
- Module **Event**s: Because it uses the `decl_event!` macro.
- **Call**able Functions: Because it has dispatchable functions in the `decl_module!` macro.
- **Config**uration Values: Because the `decl_storage!` macro has `config()` parameters.
- The **Module** type from the `decl_module!` macro.

Thus, when we add the pallet, it will look like this:

**`runtime/src/lib.rs`**

```rust
construct_runtime!(
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic
    {
        /* --snip-- */

        /*** Add This Line ***/
        Contracts: contracts::{Module, Call, Config, Storage, Event<T>},
    }
);
```

Note that not all pallets will expose all of these runtime types, and some may expose more! You
always look at the source code of a pallet or the documentation of the pallet to determine which of
these types you need to expose.

This is another good time to check that your runtime compiles correctly so far. Although the runtime
should compile, the entire node will not (yet). So we will use this command to check just the
runtime.

```bash
cargo check -p node-template-runtime
```

### Exposing The Contracts API

Some pallets, including the Contracts pallet, expose custom runtime APIs and RPC endpoints. In the
case of the Contracts pallet, this enables reading contracts state from off chain.

It's not required to enable the RPC calls on the contracts pallet to use it in our chain. However,
we'll do it to make calls to our node's storage without making a transaction.

We start by adding the required API dependencies in our `Cargo.toml`.

**`runtime/Cargo.toml`**

```TOML
[dependencies.contracts-rpc-runtime-api]
git = 'https://github.com/paritytech/substrate.git'
default-features = false
package = 'pallet-contracts-rpc-runtime-api'
version = '0.8.0-rc4'
tag = 'v2.0.0-rc4'
```

**`runtime/Cargo.toml`**

```TOML
[features]
default = ["std"]
std = [
    #--snip--
    'contracts-rpc-runtime-api/std',
]
```

To get the state of a contract variable, we have to call a getter function that will return a
`ContractExecResult` wrapper with the current state of the execution.

We need to add the return type to our runtime. Add this with the other `use` statements.

**`runtime/src/lib.rs`**

```rust
/*** Add This Line ***/
use contracts_rpc_runtime_api::ContractExecResult;
/* --snip-- */
```

We're now ready to implement the contracts runtime API. This happens in the `impl_runtime_apis!`
macro near the end of your runtime.

```rust
impl_runtime_apis! {
   /* --snip-- */

   /*** Add This Block ***/
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
			let exec_result =
				Contracts::bare_call(origin, dest.into(), value, gas_limit, input_data);
			match exec_result {
				Ok(v) => ContractExecResult::Success {
					status: v.status,
					data: v.data,
				},
				Err(_) => ContractExecResult::Error,
			}
		}

		fn get_storage(
			address: AccountId,
			key: [u8; 32],
		) -> contracts_primitives::GetStorageResult {
			Contracts::get_storage(address, key)
		}

		fn rent_projection(
			address: AccountId,
		) -> contracts_primitives::RentProjectionResult<BlockNumber> {
			Contracts::rent_projection(address)
		}
	}
   /*** End Added Block ***/
}
```

This is another good time to check that your runtime compiles correctly so far.

```bash
cargo check -p node-template-runtime
```

## Updating the Outer Node

At this point we have finished adding a pallet to the runtime. We now turn our attention to the
outer node which will often need some corresponding updates. In the case of the Contracts pallet we
will add the custom RPC endpoint and a genesis configuration.

### Adding the RPC endpoint

With the proper runtime API exposed. We now add the RPC to the node's service to call into that
runtime API. Because we are now working in the outer node, we are not building to `no_std` and we
don't have to maintain a dedicated `std` feature.

**`node/Cargo.toml`**

```toml
[dependencies]
#--snip--
jsonrpc-core = '14.0.5'

[dependencies.pallet-contracts-rpc]
git = 'https://github.com/paritytech/substrate.git'
version = '0.8.0-rc4'
tag = 'v2.0.0-rc4'

[dependencies.sc-rpc]
git = 'https://github.com/paritytech/substrate.git'
tag = 'v2.0.0-rc4'
```

**`node/src/service.rs`**

```rust
macro_rules! new_full_start {
	($config:expr) => {{
        /*** Add This Line ***/
        use jsonrpc_core::IoHandler;
```

Substrate provides an RPC to interact with our node. However, it does not contain access to the
contracts pallet by default. To interact with this pallet, we have to extend the existing RPC and
add the contracts pallet along with its API.

```rust
            /* --snip-- */
                Ok(import_queue)
            })? // <- Remove semi-colon
            /*** Add This Block ***/
            .with_rpc_extensions(|builder| -> Result<IoHandler<sc_rpc::Metadata>, _> {
                let handler = pallet_contracts_rpc::Contracts::new(builder.client().clone());
                let delegate = pallet_contracts_rpc::ContractsApi::to_delegate(handler);

                let mut io = IoHandler::default();
                io.extend_with(delegate);
                Ok(io)
            })?;
            /*** End Added Block ***/
        (builder, import_setup, inherent_data_providers)
    }}
```

### Genesis Configuration

Not all pallets will have a genesis configuration, but if yours does, you can use its documentation
to learn about it. For example,
[`pallet_contracts::GenesisConfig` documentation](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_contracts/struct.GenesisConfig.html)
describes all the fields you need to define for the Contracts pallet.

Genesis configurations are controlled in `node/src/chain_spec.rs`. We need to modify this file to
include the `ContractsConfig` type and the contract price units at the top:

**`node/src/chain_spec.rs`**

```rust
use node_template_runtime::{ContractsConfig, ContractsSchedule};
```

Then inside the `testnet_genesis` function we need to add the contract configuration to the returned
`GenesisConfig` object as followed:

> IMPORTANT: We are taking the value `_enable_println` from the function parameters. Make sure to
> remove the underscore that precedes the parameter definition.

```rust
fn testnet_genesis(initial_authorities: Vec<(AuraId, GrandpaId)>,
    root_key: AccountId,
    endowed_accounts: Vec<AccountId>,
    _enable_println: bool) -> GenesisConfig {

    GenesisConfig {
        /* --snip-- */

        /*** Add This Block ***/
        contracts: Some(ContractsConfig {
            current_schedule: ContractsSchedule {
                    enable_println,
                    ..Default::default()
            },
        }),
        /*** End Added Block ***/
    }
}
```

## Start Your Upgraded Chain

Now you are ready to compile and run your contract-capable node. Compile the node in release mode
with

```bash
cargo build --release
```

Before running the chain, we first need to purge the chain to remove the old runtime logic and have
the genesis configuration initialized for the Contracts pallet. It is possible to upgrade the chain
without purging it but it will remain out of scope for this tutorial.

```bash
./target/release/node-template purge-chain --dev
./target/release/node-template --dev
```

## Adding Other FRAME pallets

In this guide, we walked through specifically how to import the Contracts pallet, but as mentioned
in the beginning of this guide, each pallet will be a little different. Have no fear, you can always
refer to the
[demonstration Substrate node runtime](https://github.com/paritytech/substrate/blob/v2.0.0-rc4/bin/node/runtime/)
which includes nearly every pallet in the FRAME.

In the `Cargo.toml` file of the Substrate node runtime, you will see an example of how to import
each of the different pallets, and in the `lib.rs` file you will find how to add each pallet to your
runtime. You can basically copy what was done there to your own runtime.

### Learn More

- [A minimalist tutorial on writing your runtime pallet in its own package](../create-a-pallet/).
- With your node now capable of running smart contracts, go learn about
  [Substrate ink! smart contracts](../../knowledgebase/smart-contracts/).
- [Substrate Recipes](https://substrate.dev/recipes/) offers detailed tutorials about writing
  [Runtime APIs](https://substrate.dev/recipes/3-entrees/runtime-api.html) and
  [Custom RPCs](https://substrate.dev/recipes/3-entrees/custom-rpc.html) like the ones explored in
  this tutorial.
- Understand the [Chain Spec](../../knowledgebase/integrate/chain-spec) file to customize your Genesis
  Configuration.

### References

- [FRAME `Contracts` Pallet API](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_contracts/index.html)
