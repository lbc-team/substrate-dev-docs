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

class Tutorials extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;
    const pageUrl = page => baseUrl + (language ? `${language}/` : "") + page;

    const FeaturedTutorialCards = props =>
      props.data.map(tutorial => (
        <a href={tutorial.href} target="_blank" className="a_wrapper">
          <Col xl={3} lg={4} md={6} sm={12} className="mb-5 d-flex align-items-stretch">
            <Card>
              <Card.Img
                variant="top"
                src={
                  tutorial.img
                    ? tutorial.img
                    : `${baseUrl}img/substrate-placeholder.png`
                }
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{tutorial.title}</Card.Title>
                <Card.Text>{tutorial.text}</Card.Text>
                <div className="mt-auto">
                  <Badge
                    variant={
                      tutorial.difficulty == `hard`
                        ? `danger`
                        : tutorial.difficulty == `medium`
                          ? `warning`
                          : `success`
                    }
                    className="m-1"
                  >
                    {tutorial.difficulty.charAt(0).toUpperCase() +
                      tutorial.difficulty.slice(1)}
                  </Badge>
                  <Badge
                    variant={
                      tutorial.length > 4
                        ? `danger`
                        : tutorial.length > 2
                          ? `warning`
                          : `success`
                    }
                    className="m-1"
                  >
                    {tutorial.length} Hour{tutorial.length > 1 ? `s` : ``}
                  </Badge>
                  <Badge
                    variant={
                      tutorial.prerequisite == true ? `warning` : `success`
                    }
                    className="m-1"
                  >
                    {tutorial.prerequisite == true
                      ? `Prerequisites`
                      : `No Prerequisites`}
                  </Badge>
                  <Badge
                    variant={
                      tutorial.version <= 1
                        ? `danger`
                        : `warning`
                    }
                    className="m-1"
                  >
                    {`v`}{tutorial.version}
                  </Badge>
                </div>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button
                  variant="secondary"
                  className="primary-color"
                  href={tutorial.href}
                  target="_blank"
                >
                  Try it now!
              </Button>
              </Card.Footer>
            </Card>
          </Col>
        </a>
      ));

    const OtherTutorialCards = props =>
      props.data.map(tutorial => (
        <a href={tutorial.href} target="_blank" className="a_wrapper">
          <Col xl={3} lg={4} md={6} sm={12} className="mb-5 d-flex align-items-stretch">
            <Card>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{tutorial.title}</Card.Title>
                <Card.Text>{tutorial.text}</Card.Text>
                <div className="mt-auto">
                  <Badge
                    variant={
                      tutorial.difficulty == `hard`
                        ? `danger`
                        : tutorial.difficulty == `medium`
                          ? `warning`
                          : `success`
                    }
                    className="m-1"
                  >
                    {tutorial.difficulty.charAt(0).toUpperCase() +
                      tutorial.difficulty.slice(1)}
                  </Badge>
                  <Badge
                    variant={
                      tutorial.length > 4
                        ? `danger`
                        : tutorial.length > 2
                          ? `warning`
                          : `success`
                    }
                    className="m-1"
                  >
                    {tutorial.length} Hour{tutorial.length > 1 ? `s` : ``}
                  </Badge>
                  <Badge
                    variant={
                      tutorial.prerequisite == true ? `warning` : `success`
                    }
                    className="m-1"
                  >
                    {tutorial.prerequisite == true
                      ? `Prerequisites`
                      : `No Prerequisites`}
                  </Badge>
                  <Badge
                    variant={
                      tutorial.version <= 1
                        ? `danger`
                        : `warning`
                    }
                    className="m-1"
                  >
                    {`v`}{tutorial.version}
                  </Badge>
                </div>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button
                  variant="secondary"
                  className="primary-color"
                  href={tutorial.href}
                  target="_blank"
                >
                  Try it now!
              </Button>
              </Card.Footer>
            </Card>
          </Col>
        </a>
      ));

    const RuntimeRecipes = () => (
      <div>
        <h2>
          <translate>Runtime Recipes</translate>
        </h2>
        <hr />
        <p>
          <translate>
            Find code samples for common patterns and best practices when
            developing runtime modules on Substrate:
          </translate>
        </p>
        <p>
          <Button
            target="_blank"
            variant="secondary"
            className="primary-color"
            href="https://substrate.dev/recipes"
          >
            <translate>Substrate Runtime Recipes ></translate>
          </Button>
        </p>
      </div>
    );

    const RecommendedTutorials = () => (
      <div>
        <h2>
          <translate>先试试这些教程!</translate>
        </h2>
        <hr />
        <Row>
          <FeaturedTutorialCards
            data={[
              {
                img: `${baseUrl}img/crates.png`,
                title: (
                  <translate>创建第一条Substrate区块链</translate>
                ),
                text: (
                  <translate>
                    在此基础教程中启动你的第一个Substrate链并与之交互。
                  </translate>
                ),
                difficulty: "easy",
                length: "< 1",
                prerequisite: false,
                version: "2.0.0-rc4",
                href: `${docUrl(
                  "tutorials/create-your-first-substrate-chain/"
                )}`
              },
              {
                img: `${baseUrl}img/first-substrate-chain.png`,
                title: (
                  <translate>构建一个PoE(存证) 去中心化应用</translate>
                ),
                text: (
                  <translate>
                    构建一个自定义用户接口的Substrate链及前端
                  </translate>
                ),
                difficulty: "easy",
                length: "1",
                prerequisite: true,
                version: "2.0.0-rc4",
                href: `${docUrl(
                  "tutorials/build-a-dapp/"
                )}`
              },
              {
                title: (
                  <translate>给你的 Runtime添加 Pallet </translate>
                ),
                text: (
                  <translate>
                    添加合约 pallet 或其他的 FRAME pallets 到你的 Substrate 节点模板。
                  </translate>
                ),
                difficulty: "medium",
                length: "2",
                prerequisite: false,
                version: "2.0.0-rc4",
                href: `${docUrl(
                  "tutorials/add-a-pallet-to-your-runtime/")}`
              },
              {
                img: `${baseUrl}img/substrate-network.png`,
                title: (
                  <translate>用 Substrate 启动一个是私有网络</translate>
                ),
                text: (
                  <translate>
                    了解如何使用现成的Substrate节点启动区块链网络。
                  </translate>
                ),
                difficulty: "easy",
                length: "2",
                prerequisite: false,
                version: "2.0.0-rc4",
                href: `${docUrl(
                  "tutorials/start-a-private-network/"
                )}`
              },
              {
                img: `${baseUrl}img/ink-smart-contracts-tutorial.png`,
                title: <translate>ink! 智能合约教程</translate>,
                text: (
                  <translate>
                    有关使用 ink！构建ERC20代币合约的全面教程。
                  </translate>
                ),
                difficulty: "easy",
                length: "4",
                prerequisite: false,
                version: "2.0.0-rc4",
                href:
                  "https://substrate-developer-hub.github.io/substrate-contracts-workshop/"
              },
              {
                img: `${baseUrl}img/crates.png`,
                title: (
                  <translate>Write a Pallet in its Own Crate</translate>
                ),
                text: (
                  <translate>
                    Make your pallets re-usable by packaging them in
                    their own rust crate.
                  </translate>
                ),
                difficulty: "medium",
                length: "2",
                prerequisite: false,
                version: "2.0.0-rc4",
                href: `${docUrl("tutorials/create-a-pallet/")}`
              },
              {
                img: `${baseUrl}img/grafana.png`,
                title: (
                  <translate>Visualizing Node Metrics</translate>
                ),
                text: (
                  <translate>
                    Learn how to visualize the metrics that Substrate records using Prometheus.
                  </translate>
                ),
                difficulty: "easy",
                length: "< 1",
                prerequisite: false,
                version: "2.0.0-rc4",
                href: `${docUrl("tutorials/visualize-node-metrics/")}`
              }
            ]}
          />
        </Row>
      </div>
    );

    return (
      <div>
        <HomeSplash
          siteConfig={siteConfig}
          language={language}
          title={<translate>Substrate 教程目录</translate>}
          tagline={<translate>一起来学习吧!</translate>}
          padding={0}
        />
        <div className="mainContainer">
          <Container>
            <RecommendedTutorials />
          </Container>
        </div>
      </div>
    );
  }
}

function sort_by_name(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

Tutorials.title = "中文教程";
Tutorials.description = "找到有关Sustrate的最新教程";
module.exports = Tutorials;
