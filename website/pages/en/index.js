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

const React = require('react')

const HomeSplash = require(`${process.cwd()}` + `/core/HomeSplash`)

const Container = require('../../../../react-bootstrap/Container')
const Button = require('../../../../react-bootstrap/Button')
const Row = require('../../../../react-bootstrap/Row')
const Col = require('../../../../react-bootstrap/Col')
const Image = require('../../../../react-bootstrap/Image')
const translate = require('../../server/translate').translate

class Index extends React.Component {
	render() {
		const { config: siteConfig, language = '' } = this.props
		const { baseUrl, docsUrl } = siteConfig
		const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
		const langPart = `${language ? `${language}/` : ''}`
		const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`
		const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page

		return (
			<section>
				<HomeSplash
					id='home-hero'
					siteConfig={siteConfig}
					language={language}
					title="Substrate 开发者中心"
					tagline={<translate>让你专注于愿景的区块链框架</translate>}
					description={
						<translate> Substrate是一个模块化的区块链框架，你可以为应用程序或企业选择适合自己的组件。</translate>
					}
					buttonText={<translate>开始</translate>}
					buttonUrl={`tutorials`}
				/>

				<section className='mainContainer' id='home'>
					<Container>
						<section className='intro-statement home-section'>
							<span className='tagline'>为什么使用Substrate</span>

							<h2 className='large h1'>专注你的业务</h2>
							<p> Substrate可帮助你快速开发区块链，以便你专注于自己的业务领域知识。
							</p>
						</section>

						<section className='intro-blocks home-section'>
							<section className='intro-block'>
								<section className='icon-wrap'>
									<div className='icon runtime' />
								</section>
								<h4>Runtime 开发</h4>
								<p>了解如何使用Substrate构建自定义区块链。</p>
								<section className='button-wrap'>
									<a
										href='https://learnblockchain.cn/docs/substrate/docs/tutorials/build-a-dapp/'
										className='with-arrow'>
										了解更多
									</a>
								</section>
							</section>

							<section className='intro-block'>
								<section className='icon-wrap'>
									<div className='icon frontend' />
								</section>
								<h4>前端开发</h4>
								<p>了解如何使用Polkadot-JS打造交互式用户体验。</p>
								<section className='button-wrap'>
									<a
										href='https://github.com/substrate-developer-hub/substrate-front-end-template'
										className='with-arrow'
									>
										了解更多
									</a>
								</section>
							</section>

							<section className='intro-block'>
								<section className='icon-wrap'>
									<div className='icon smart-contract' />
								</section>
								<h4>智能合约开发</h4>
								<p>了解如何使用 ink! 构建Wasm智能合约。</p>
								<section className='button-wrap'>
									<a
										href='https://substrate.dev/substrate-contracts-workshop/#/'
										className='with-arrow'>
										了解更多
									</a>
								</section>
							</section>
						</section>
					</Container>

					<section className='bg-white what-is-substrate'>
						<div className='container'>
							<div className='pt-5'>
								<div className='row justify-content-center text-center py-3'>
									<div className='col-12 col-md-8'>
										<h4>Substrate是什么</h4>
										<h2 className='display-4 h1'>构建区块链所需的一切。</h2>
										<p className='lead mb-4'>
                      Substrate 集成了 p2p网络，共识算法和密码库。
										</p>
									</div>
								</div>
							</div>
							<div className='row py-5 features'>
								<div className='col-12 col-md-4 mb-4'>
									<div className='d-flex align-items-center mb-2'>
										<img className='mr-2' src='./img/glyphs/rectangle-1.svg' width='40' />
										<h3 className='mb-0'>快速高效的数据库</h3>
									</div>
								</div>
								<div className='col-12 col-md-4 mb-4'>
									<div className='d-flex align-items-center mb-2'>
										<img className='mr-2' src='./img/glyphs/rectangle-2.svg' width='40' />
										<h3 className='mb-0'>libp2p下的模块化P2P网络技术栈</h3>
									</div>
								</div>
								<div className='col-12 col-md-4'>
									<div className='d-flex align-items-center mb-2'>
										<img className='mr-2' src='./img/glyphs/rectangle-3.svg' width='40' />
										<h3 className='mb-0'>热插拔共识层</h3>
									</div>
								</div>
								<div className='col-12 col-md-4 mb-4'>
									<div className='d-flex align-items-center mb-2'>
										<img className='mr-2' src='./img/glyphs/rectangle-4.svg' width='40' />
										<h3 className='mb-0'>可定制的交易队列管理系统</h3>
									</div>
								</div>
								<div className='col-12 col-md-4 mb-4'>
									<div className='d-flex align-items-center mb-2'>
										<img className='mr-2' src='./img/glyphs/rectangle-5.svg' width='40' />
										<h3 className='mb-0'>可组合的运行时(Runtime)逻辑框架</h3>
									</div>
								</div>
								<div className='col-12 col-md-4'>
									<div className='d-flex align-items-center mb-2'>
										<img className='mr-2' src='./img/glyphs/rectangle-6.svg' width='40' />
										<h3 className='mb-0'>支持轻量级移动端</h3>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className='bg-light call-outs first'>
						<div className='container'>
							<div className='row justify-content-between align-items-center py-5'>
								<div className='col-12 col-md-5 order-2 order-md-1'>
									<h2 className='h1'>智能合约已就绪</h2>
									<p className='large mb-4'>
                    Substrate具有Wasm智能合约平台，你可以直接使用它。
                    由于Substrate使用Wasm，因此你可以使用任何兼容的语言来构建智能合约。
                    我们已经为此构建了ink! ，这是基于Rust的eDSL。
									</p>
									<a
										className='action-link'
										href='https://learnblockchain.cn/docs/substrate/docs/knowledgebase/smart-contracts/overview/'>
										<span>更多关于ink!</span>
									</a>
								</div>
								<div className='col-12 col-md-6 order-1 order-md-2 pl-md-0 mb-4 mb-md-0 text-center'>
									<img className='w-25' src='./img/pictures/substrate-wasm.svg' />
								</div>
							</div>
						</div>
					</section>

					<section className='bg-light call-outs second'>
						<div className='container'>
							<div className='row justify-content-between align-items-center py-5 polkadot-row'>
								<div className='col-12 col-md-6 pl-md-0 mb-4 mb-md-0 text-center polkadot-graphic-wrap'>
									<img src='./img/pictures/polkadot-network.svg' className='polkadot-image' />
									<div
										className='polkadot-graphic'
										style={{ backgroundImage: `url(./img/pictures/polkadot-network.svg)` }}
									/>
								</div>
								<div className='col-12 col-md-5'>
									<h2 className='h1'>(即将) 主网发布</h2>
									<p className='large mb-4'>
                  Substrate驱动着下一代区块链网络Polkadot，这是一个异构的多链网络。 大多数将与Polkadot相连的“平行链”网络也将基于Substrate构建。
                  Substrate正在进行安全审计，为2020年发布的Polkadot网络做准备。
									</p>
									<a className='action-link' href='https://polkadot.network/technology/'>
										<span>了解更多关于Polkadot</span>
									</a>
								</div>
							</div>
						</div>
					</section>

					<section className='bg-white learn'>
						<div className='container'>
							<div className='row justify-content-center text-center pt-5'>
								<div className='col-12 col-md-10'>
									<h4>学习Substrate</h4>
									<h2 className='h1'>多种方式学习Substrate.</h2>
								</div>
							</div>
						</div>
					</section>

					<section className='bg-white learn-blocks'>
						<div className='container'>
							<div className='row text-center flex-md-nowrap py-md-5'>
								<div className='col-12 col-md-6'>
									<div className='row justify-content-center'>
										<div className='col-12 col-lg-8'>
											<div className='py-5 py-md-0'>
												<h2>Substrate Seminar</h2>
												<p className='mb-3'>
                        Substrate Seminar是一个开放式线上协作学习会议，我们可以在此一起学习有关Substrate的知识。
												</p>
												<a
													className='btn primary-color'
													href='https://substrate.dev/en/seminar'>
													加入Seminar
												</a>
											</div>
											<div className='border-bottom d-md-none' />
										</div>
									</div>
								</div>
								<div className='border-right d-none d-md-block' />
								<div className='col-12 col-md-6'>
									<div className='row justify-content-center'>
										<div className='col-12 col-lg-8'>
											<div className='py-5 py-md-0'>
												<h2>Substrate Playground</h2>
												<p className='mb-3'>
                        Playground是一个基于浏览器的线上IDE（类似VSCode），具有完整的终端支持，可以在此环境中开始substrate runtime开发。
												</p>
												<a
													className='btn primary-color'
													href='https://playground.substrate.dev'>
													启动 Playground
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className='bg-light bottom-cta'>
						<div className='container'>
							<div className='py-5'>
								<div className='row justify-content-center text-center py-3'>
									<div className='col-12 col-md-10'>
										<h2 className='display-4 h1'>准备基于Substrate构建区块链?</h2>
									</div>
									<div className='col-12 col-md-8'>
										<p className='lead mb-4'>
                    开始使用文档或在Riot聊天中提问技术问题，结识与你有共同兴趣的人或关注正在发生的事情
										</p>
										<div className='d-flex justify-content-center'>
											<div className='px-1'>
												<a
													className='btn btn-lg primary-color'
													href='https://learnblockchain.cn/docs/substrate/docs/'>
													前往文档
												</a>
											</div>
											<div className='px-1'>
												<a
													className='btn btn-lg btn-outline-primary'
													href='https://riot.im/app/#/room/!HzySYSaIhtyWrwiwEV:matrix.org'>
													咨询问题
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</section>
			</section>
		)
	}
}

Index.title = 'Substrate中文文档 - 登链社区翻译'
Index.description = '学习使用下一代区块链框架构建区块链。'
module.exports = Index
