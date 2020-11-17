/**
 * Copyright 2019 Parity Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *     http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const React = require("react");
const HomeSplash = require(`${process.cwd()}` + `/core/HomeSplash`);
const Container = require("../../../../react-bootstrap/Container");
const Button = require("../../../../react-bootstrap/Button");
const Card = require("../../../../react-bootstrap/Card");
const Col = require("../../../../react-bootstrap/Col");
const Row = require("../../../../react-bootstrap/Row");
const Badge = require("../../../../react-bootstrap/Badge");
const translate = require("../../server/translate").translate;

const tutorialCardData = [{
  img: 'img/crates.png',
  title: <translate>创建第一条Substrate区块链</translate>,
  text: <translate>在这个最基础的手把手教程中，启动你的第一个Substrate链并与之交互</translate>,
  difficulty: "easy",
  length: "< 1",
  prerequisite: false,
  version: "2.0.0",
  href: 'tutorials/create-your-first-substrate-chain/',
}, {
  title: <translate>给你的 Runtime添加 Pallet </translate>,
  text: <translate>添加 Nicks pallet 到你的 Substrate 节点模板。</translate>,
  difficulty: "easy",
  length: "2",
  prerequisite: true,
  version: "2.0.0",
  href: 'tutorials/add-a-pallet/',
}, {
  img: 'img/first-substrate-chain.png',
  title: <translate>构建一个PoE(存证) 去中心化应用</translate>,
  text: <translate> 构建一个自定义用户接口的Substrate链及前端</translate>,
  difficulty: "easy",
  length: "1",
  prerequisite: true,
  version: "2.0.0",
  href: 'tutorials/build-a-dapp/',
}, {
  title: "Upgrade a Chain",
  text: "Perform a forkless runtime upgrade on a running Substrate network.",
  difficulty: "medium",
  length: "2",
  prerequisite: true,
  version: "2.0.0",
  href: 'tutorials/upgrade-a-chain/',
}, {
  img: 'img/substrate-network.png',
  title: <translate>用 Substrate 启动一个是私有网络</translate>,
  text: <translate> 了解如何使用开箱即用的Substrate节点启动区块链网络。</translate>,
  difficulty: "easy",
  length: "2",
  prerequisite: false,
  version: "2.0.0",
  href: 'tutorials/start-a-private-network/',
}, {
  title: <translate>添加智能合约 Pallet 到 Runtime </translate>,
  text: <translate>添加智能合约 Pallet 到你的 Substrate 节点模板 </translate>,
  difficulty: "medium",
  length: "2",
  prerequisite: true,
  version: "2.0.0",
  href: 'tutorials/add-contracts-pallet/',
}, {
  title: <translate>构建一个许可（permissioned）网络</translate>,
  text: <translate>全面的手把手教程，学习使用node-authorization pallet 构建许可网络</translate>,
  difficulty: "easy",
  length: "2",
  prerequisite: true,
  version: "2.0.0",
  href: 'tutorials/build-permission-network/',
}, {
  img: 'img/crates.png',
  title: <translate>在自己的包（Crate）中编写一个 Pallet </translate>,
  text: <translate>通过用 Crate 打包使pallet可重复使用。</translate>,
  difficulty: "medium",
  length: "2",
  prerequisite: true,
  version: "2.0.0",
  href: 'tutorials/create-a-pallet/',
}, {
  img: 'img/ink-smart-contracts-tutorial.png',
  title: <translate>ink! 智能合约教程 </translate>,
  text: <translate>全面的手把手教程，学习使用ink! 开发 ERC20 代币</translate>,
  difficulty: "easy",
  length: "4",
  prerequisite: false,
  version: "2.0.0",
  hrefFrom: 'baseUrl',
  href: 'tutorials/ink-smart-contracts-tutorial/',
}, {
  img: 'img/grafana.png',
  title: <translate>Visualizing Node Metrics</translate>,
  text: <translate>Learn how to visualize the metrics that Substrate records using Prometheus.</translate>,
  difficulty: "easy",
  length: "< 1",
  prerequisite: false,
  version: "2.0.0",
  href: 'tutorials/visualize-node-metrics/',
}];

const capitalize = word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

const TutorialCards = props => {
  let { baseUrl, docUrl } = props;
  const tutorialUrl = tut => tut.hrefFrom == 'baseUrl' ? baseUrl(tut.href) : docUrl(tut.href);

  return props.data.map(tutorial => <a href={tutorialUrl(tutorial)} className="a_wrapper">
    <Col xl={3} lg={4} md={6} sm={12} className="mb-5 d-flex align-items-stretch"><Card>
      <Card.Img
        variant="top"
        src={ tutorial.img ? baseUrl(tutorial.img) : baseUrl('img/substrate-placeholder.png') }
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{tutorial.title}</Card.Title>
        <Card.Text>{tutorial.text}</Card.Text>
        <div className="mt-auto">
          <Badge
            variant={tutorial.difficulty == `hard`
              ? `danger`
              : tutorial.difficulty == `medium` ? `warning` : `success`
            }
            className="m-1"
          >{capitalize(tutorial.difficulty)}
          </Badge>
          <Badge
            variant={tutorial.length > 4
              ? `danger`
              : tutorial.length > 2 ? `warning` : `success`
            }
            className="m-1"
          >{tutorial.length} Hour{tutorial.length > 1 ? `s` : ``}</Badge>
          <Badge
            variant={tutorial.prerequisite == true ? `warning` : `success`}
            className="m-1"
          >{tutorial.prerequisite ? `Prerequisites` : `No Prerequisites`}</Badge>
          <Badge
            variant={tutorial.version <= 1 ? `danger` : `warning`}
            className="m-1"
          >{`v`}{tutorial.version}</Badge>
        </div>
      </Card.Body>

      <Card.Footer className="text-center">
        <Button
          variant="secondary"
          className="primary-color"
          href={tutorialUrl(tutorial)}
        >Try it now!</Button>
      </Card.Footer>
    </Card></Col>
  </a>);
};

class Tutorials extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;

    const docUrlHandler = url => (url.startsWith('http://') || url.startsWith('https://'))
      ? url
      : `${baseUrl}${docsPart}${langPart}${url}`;

    const baseUrlHandler = url => (url.startsWith('http://') || url.startsWith('https://'))
      ? url
      : `${baseUrl}${url}`;

    return <div>
      <HomeSplash
        siteConfig={siteConfig}
        language={language}
        title="Substrate教程目录"
        tagline="一起来学习吧!"
        padding={0}
      />
      <div className="mainContainer"><Container><Row>
        <TutorialCards baseUrl={baseUrlHandler} docUrl={docUrlHandler}
          data={ tutorialCardData } />
      </Row></Container></div>
    </div>;
  }
}

Tutorials.title = "Substrate中文教程";
Tutorials.description = "Substrate最新教程";
module.exports = Tutorials;
