module.exports = {
  title: "Substrate 开发者文档",
  description: "Substrate 开发者中文文档",
  ga: "",
  dest: "./dist/docs",
  base: "/docs/substrate/",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    repo: "lbc-team/substrate-dev-docs",
    editLinks: true,
    docsDir: "docs",
    docsBranch: "lbc",
    editLinkText: '帮助完善文档',
    lastUpdated: true,
    search: true,
    searchMaxSuggestions: 10,

    nav: [
      { text: "博客", link: "https://learnblockchain.cn" },
      { text: "区块链文库", link: "https://learnblockchain.cn/site/docs/" },
      { text: "问答", link: "https://learnblockchain.cn/questions" }
    ],
    footer: "© Copyright 2019-2020 登链社区",
    sidebar: [
      {
        title: "Overview",
        collapsable: true,
        children: [
        "overview/index",
        "overview/getting-started",
        "conceptual/runtime/frame",
        "overview/glossary"
      ],
    },
    {
    title: "Substrate Core",
      collapsable: true,
      children:  [
        "conceptual/core/codec",
        "conceptual/core/consensus",
        "conceptual/core/executor",
        "conceptual/core/off-chain-workers",
        "conceptual/core/storage"
      ],
    },
    {
      title:  "Substrate Nodes",
      collapsable: true,
      children: [
        "conceptual/node/extrinsics",
        "conceptual/node/tx-pool"
      ],
    },
    {
      title: "Cryptography",
      collapsable: true, 
      children: [
        "conceptual/cryptography/index",
        "conceptual/cryptography/keys",
        "conceptual/cryptography/session-keys",
        "conceptual/cryptography/ss58-address-format"
      ],
    },
    {
      title: "Substrate Runtime",
      collapsable: true,
      children: [
        "conceptual/runtime/index",
        "conceptual/runtime/weight",
        "conceptual/runtime/primitives",
        "development/module/execution",
        "development/module/macros",
        "development/module/storage",
        "development/module/events",
        "development/module/off-chain-workers",
        "development/module/fees",
        "development/module/tests",
        "development/module/debugging"
      ],
    },
      {
      title: "Smart Contracts",
      collapsable: true,
      children: [
        "conceptual/runtime/contracts/index",
        "conceptual/runtime/contracts/contracts_module",
        "conceptual/runtime/contracts/evm_module",
        "conceptual/runtime/contracts/ink",
        "development/contracts/ink"
      ],
    },
    {
      title: "Deployment",
      collapsable: true,
      children: [
        "development/build/prerequisites",
        "development/build/purge-chain",
        "development/build/upgrade",
        "development/deployment/chain-spec",
        "development/deployment/account-prefix",
        "development/deployment/boot-node",
        "development/deployment/disabling-features"
      ],
    },
    {
      title: "Front End",
      collapsable: true,
      children: [
        "development/front-end/polkadot-js",
        "development/front-end/json-rpc"
      ],
    },
    {
      title: "Ecosystem Tools",
      collapsable: true, 
      children: [
        "development/tools/subkey"
      ],
    },
    {
      title: "Contribute", 
      collapsable: true, 
      children: [
        "contribute/help-translate"
      ]
    },
    {
    title:  "Creating Your First Substrate Chain",
    collapsable: true, 
      children: [
        "tutorials/creating-your-first-substrate-chain/index",
        "tutorials/creating-your-first-substrate-chain/setup",
        "tutorials/creating-your-first-substrate-chain/background",
        "tutorials/creating-your-first-substrate-chain/interact"
      ]
    },
    {
    title:  "Build a PoE Decentralized Application",
    collapsable: true, 
      children: [
        "tutorials/build-a-dapp/index",
        "tutorials/build-a-dapp/prepare",
        "tutorials/build-a-dapp/pallet",
        "tutorials/build-a-dapp/front-end"
      ]
    },
    {
    title: "Start a Private Network",
    collapsable: true,  
      children: [
        "tutorials/start-a-private-network/index",
        "tutorials/start-a-private-network/alicebob",
        "tutorials/start-a-private-network/keygen",
        "tutorials/start-a-private-network/customchain"
      ]
    },
    {
    title:  "Substrate Front End Tutorial",
    collapsable: true,  
      children: [
        "tutorials/substrate-front-end/index",
        "tutorials/substrate-front-end/part-1-connect-to-a-node",
        "tutorials/substrate-front-end/part-2-query-balances",
        "tutorials/substrate-front-end/part-3-transfer-funds",
        "tutorials/substrate-front-end/part-4-use-external-accounts"
      ]
    }
    ]
  }
};
