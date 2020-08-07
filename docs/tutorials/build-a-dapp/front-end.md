---
title: 定制前端
---

到这里，你应该已经运行了一个全新的具有自定义功能的区块链。


现在我们将定制一个自定义的react组件，你可以将其添加到`substrate-front-end-template`中。用于与自定义节点进行交互。


## 探索前端模板

要运行前端模板，定位到根目录并运行：


```bash
yarn start
```

你的浏览器中应会打开一个新标签，并看到以下界面。


![前端模板](assets/tutorials/build-a-dapp/front-end-template.png)

你会看到一个预注资金帐户列表，并且可以在这些帐户之间进行代币转移。


![Balance Transfer](assets/tutorials/build-a-dapp/front-end-template-balance-transfer.png)

## 添加自定义 React 组件

在 `substrate-front-end-template` 项目中, 编辑`/src/`下的 `TemplateModule.js`：


```
substrate-front-end-template
|
+-- src
|   |
|   +-- index.js
|   |
|   +-- App.js
|   |
|   +-- TemplateModule.js  <-- 编辑这个文件
|   |
|   +-- ...
+-- ...
```

删除该文件的内容，改用下面的组件。


<div style="max-height: 20em; overflow: auto; margin-bottom: 1em;">

```js
// React and Semantic UI elements.
import React, { useState, useEffect } from 'react';
import { Form, Input, Grid, Message } from 'semantic-ui-react';
// 预先构建好的 Substrate 前端工具：用来连接节点和发起交易
import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';
// Polkadot-JS 工具用来对数据hash
import { blake2AsHex } from '@polkadot/util-crypto';

// 存证组件
export function Main (props) {
  // 建议用于和Substrate节点的连接的 API
  const { api } = useSubstrate();
  // 获取从`AccountSelector`组件选择的用户
  const { accountPair } = props;
  // 用来跟踪状态的React hooks
  // 从 https://reactjs.org/docs/hooks-intro.html 了解更多
  const [status, setStatus] = useState('');
  const [digest, setDigest] = useState('');
  const [owner, setOwner] = useState('');
  const [block, setBlock] = useState(0);

  // 用来读取文件
  let fileReader;

  // 获取文件的 hash 
  const bufferToDigest = () => {
    // Turns the file content to a hexadecimal representation.
    const content = Array.from(new Uint8Array(fileReader.result))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const hash = blake2AsHex(content, 256);
    setDigest(hash);
  };

  // 选择新文件时回调
  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = bufferToDigest;
    fileReader.readAsArrayBuffer(file);
  };

  // React hook 用来更新文件对应的 'Owner' 和 'Block Number' 信息
  useEffect(() => {
    let unsubscribe;

    // Polkadot-JS API 查询在 pallet 的 `proofs` 存储
    // 这是一个订阅, 即使值改变了，也会获取最新的值，
    api.query.templateModule
      .proofs(digest, (result) => {
        // 存储返回元组（tuple）它用数组表示
        setOwner(result[0].toString());
        setBlock(result[1].toNumber());
      })
      .then((unsub) => {
        unsubscribe = unsub;
      });

    return () => unsubscribe && unsubscribe();
    // 告诉React Root 在文件摘要更改时（如选择了新文件）或存储项的值更新时进行更新。
  }, [digest, api.query.templateModule]);

  // 如果存储的区块号不为0，则文件摘要已经被声明。
  function isClaimed () {
    return block !== 0;
  }

  // 从我们的组件返回的实际UI元素。 
  return (
    <Grid.Column>
      <h1>Proof Of Existence</h1>
      {/* 根据文件时候被声明，显示警告和成功信息 */}
      <Form success={!!digest && !isClaimed()} warning={isClaimed()}>
        <Form.Field>
          {/* 用于选择文件，选择后回调 `handleFileChosen`. */}
          <Input
            type='file'
            id='file'
            label='Your File'
            onChange={(e) => handleFileChosen(e.target.files[0])}
          />
          {/* 如果文件可被声明显示 */}
          <Message success header='File Digest Unclaimed' content={digest} />
          {/* 如果文件已经声明显示 */}
          <Message
            warning
            header='File Digest Claimed'
            list={[digest, `Owner: ${owner}`, `Block: ${block}`]}
          />
        </Form.Field>
        {/* 用来和交易的按钮 */}
        <Form.Field>
          {/* 声明存证按钮. 仅在文件选中及没被声明过时可用。 会更新状态 */}
          <TxButton
            accountPair={accountPair}
            label={'Create Claim'}
            setStatus={setStatus}
            type='SIGNED-TX'
            disabled={isClaimed() || !digest}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'createClaim',
              inputParams: [digest],
              paramFields: [true]
            }}
          />
          {/* 撤销存证按钮. 仅在文件选中及声明过时可用。 会更新状态. */}
          <TxButton
            accountPair={accountPair}
            label='Revoke Claim'
            setStatus={setStatus}
            type='SIGNED-TX'
            disabled={!isClaimed() || owner !== accountPair.address}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'revokeClaim',
              inputParams: [digest],
              paramFields: [true]
            }}
          />
        </Form.Field>
        {/* 交易的状态信息 */}
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function TemplateModule (props) {
  const { api } = useSubstrate();
  return (api.query.templateModule && api.query.templateModule.proofs
    ? <Main {...props} /> : null);
}
```

</div>

我们不会逐步引导你完成此组件的创建，但是请仔细阅读代码注释以了解每个部分的功能。


## 提交证明

保存更改后，前端模板应该会重新加载，你会注意到我们的新组件。 现在，我们准备试用一下新的dApp。 选择计算机上的任何文件，会看到可以使用其文件摘要创建声明：


![存证组件](assets/tutorials/build-a-dapp/poe-component.png)

如果你点击 "Create Claim", 会发起一个交易到自定义的存证 pallet ，摘要和选择的用户会保存到链上。

![声明的文件](assets/tutorials/build-a-dapp/poe-claimed.png)


如果一切顺利，应该会在事件组件中看到一个新的`ClaimCreated`事件。 前端会自动识别你的文件已被声明，并且可以根据需要选择撤消声明。


请记住，只有所有者才能撤消声明！ 如果你在顶部选择另一个用户帐户，则会看到撤消被禁用！


## 接下来

我们的存证案例就完成了。

你已经亲眼看到了开发一个全新的pallet并用Substrate启动一个自定义区块链是很简单的。 
此外，我们还展示了使用Substrate生态系统提供的前端工具快速创建响应式前端应用，以便用户与区块链进行交互。


本教程里省略一些有关开发的特定细节，以使教程简洁而令人满意。 但是，我们希望你继续学习！


更多关于创建直接的pallet，可以阅读[Substrate Recipes](https://substrate.dev/recipes).


我们也应该告诉你，你在Substrate框架上最终的成功将受限于你的Rust编程的能力。 [Rust Book](https://doc.rust-lang.org/book/)是初级和中级Rust开发人员的重要学习资源。

如果你在本教程中遇到任何问题或想提供反馈，请随时[创建GitHub Issue](https://github.com/substrate-developer-hub/tutorials/issues/new)或在[Riot](https://riot.im/app/#/room/!HzySYSaIhtyWrwiwEV:matrix.org)联系我们。


我们迫不及待想看看你接下来的建造！


