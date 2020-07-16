# Substrate 开发者中文文档


本份 Substrate 开发者中文文档由登链社区发起，由[Cell Network](https://www.cellnetwork.io/?utm_souce=learnblockchain#/cellhome) 和 [登链社区](https://learnblockchain.cn/) 共同赞助。
如果你对我们的翻译计划感兴趣，来看看[招募译者](https://learnblockchain.cn/article/796) .


登链社区[区块链技术文档中心](https://learnblockchain.cn/site/docs) 已经有很多文档，本 Substrate 开发者中文文档将托管在 [https://learnblockchain.cn/docs/substrate/](https://learnblockchain.cn/docs/substrate/) 。

未经授权，请勿转载。

## 翻译说明

本文档翻译遵循以下原则：

1. 尊重原文档的结构、格式
2. 采用认领、翻译、校对、发布流程。


**注意事项**

* 为避免译者重复翻译，译者需要提前认领一周的工作量，认领和翻译完成时，都需要及时更新[进度文件](process.md)
* 翻译时，除了用语规范外，还要注意文件间链接跳转正确
* 翻译完成后，译者之间需要相互校对，可以在GitHub提交PR后，译者群里告知一下译者同伴。


## 翻译方法

1. 安装
本文档由 Markdown 编写， Docusaurus 构建， 不过Docusaurus是使用 NPM 进行包管理，我们只需要简单的使用以下命令就可以安装好依赖：


```
git clone https://github.com/lbc-team/substrate-dev-docs
cd  substrate-dev-docs
cd website
yarn (或yarn install)
```

使用`yarn start` 就可以启动本地预览， 浏览器访问 `http://localhost:3000/docs/en/` 查看预览。
> 预览时，可能需要等待 数10 秒左右才能看到内容，主要是Docusaurus会默认访问外网资源导致。

2. 翻译及编译文档 

```
// 当前翻译默认分支为lbc, 切出自己的分支
git checkout -b mybranch
// 翻译docs 下文文件，更新相应的 process.md 文件

// 本地预览
yarn start
```

3. 提交PR

翻译完成后，先自己检查一篇，没问题后，提交PR，告诉队友Review.

## 常见问题

0. [中文文案排版指北](https://github.com/mzlogin/chinese-copywriting-guidelines)
1. 文档如何构建：文档将托管在[登链社区](https://learnblockchain.cn/docs/substrate/)，在校对完成后，管理员发布。
2. 原英文文档更新怎么办，文档管理员会定期查看更新内容，进行补充。

