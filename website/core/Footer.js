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

class Blast extends React.Component {
  render() {
    // FIXME: Doccusaurus v1 doesn't allow  for themes or customisation yet
    // so we have to inline some styles to move our element to top
    let cfg = this.props.config;
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
#blast {
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 50px;
  background-image: ${cfg.background};
  color: ${cfg.fontColor ? cfg.fontColor : 'white'};
  z-index: 99999;
  text-align: center;
  background-color: #000028;
  transition: background-color 0.2s;
}
#blast:hover {
  background-color: #E91E63;
}

#blast h2 {
  margin: 0;
  line-height: 50px;
}

#blast a {
  display: block;
  color: ${cfg.fontColor ? cfg.fontColor : 'white'};
  text-decoration: underline;
  mix-blend-mode: lighten;
}

#blast img {
  max-height: 50px;
}

body {
  margin-bottom: 50px;
}
`
          }}
        />
        <section id='blast'>
          {cfg.img ? (
            <a href={cfg.link} target="_blank">
              <img src={cfg.img} className='img-fluid' />
            </a>
          ) : (
            <h2>
              {cfg.intro}
              <a href={cfg.link} target="_blank">{cfg.label}</a>
            </h2>
          )}
        </section>
      </div>
    );
  }
}

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : "") + doc;
  }

  render() {
    let blast = this.props.config.blast;
    return (
      <footer className="nav-footer" id="footer">
        {blast ? <Blast config={blast} /> : ""}
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>开发者中心</h5>
            <a href={this.pageUrl("tutorials", this.props.language)}>
              教程
            </a>
            <a href={'/docs/' + this.props.language + '/'}>
              知识库
            </a>
            <a href="https://substrate.dev/recipes/">菜谱</a>
            <a href="https://substrate.dev/rustdocs">接口文档</a>
          </div>
          <div>
            <h5>社区</h5>
            <a href={this.pageUrl("community", this.props.language)}>Community Home</a>
            <a
              href="http://stackoverflow.com/questions/tagged/substrate"
              target="_blank"
              rel="noreferrer noopener"
            >
              Stack Overflow
            </a>
            <a
              href="https://twitter.com/ParityTech"
              target="_blank"
              rel="noreferrer noopener"
            >
              Twitter
            </a>
            <a
              href="https://www.meetup.com/parity/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Events
            </a>
          </div>
          <div>
            <h5>更多</h5>
            <a href="https://www.substrate.io/builders-program/">Substrate Builders Program</a>
            <a href="https://www.parity.io/blog/">Blog</a>
            <a href="https://github.com/paritytech/substrate">
              Substrate GitHub
            </a>
            <a href="https://github.com/substrate-developer-hub/">
              Developer Hub GitHub
            </a>
          </div>
        </section>

        <section className="copyright">本Substrate文档由
          <a href="https://learnblockchain.cn/">
            {this.props.config.copyright}
          </a>翻译
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
