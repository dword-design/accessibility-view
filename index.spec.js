import { endent, mapValues } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import execa from 'execa'
import express from 'express'
import P from 'path'

const screenshotTest = test =>
  async function () {
    const server = express()
      .get('/', (req, res) => res.send(test))
      .listen(3000)
    try {
      await this.page.goto('http://localhost:3000')
      await this.page.waitForSelector('style.accessibility-view')

      const element = await this.page.waitForSelector('body > *')
      expect(await element.screenshot()).toMatchImageSnapshot(this)
    } finally {
      await server.close()
    }
  }

export default tester(
  {
    ...({
      address: endent`
        <address>
          Mirecourtstr. 8
          53225 Bonn
        </address>
      `,
      'aria-hidden': '<div>Foo <span aria-hidden=true>bar</span></div>',
      blockquote: endent`
        <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas faucibus mollis interdum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
        </blockquote>
      `,
      bold: '<div>Morbi <b>leo risus</b>, porta ac consectetur ac</div>',
      code: endent`
        <pre>
          <code>
            export default () => {
              console.log('foo')
            }
          </code>
        </pre>
      `,
      color: '<div color="red">Morbi leo risus, porta ac consectetur ac</div>',
      'description list': endent`
        <dl>
          <dt>allg.</dt>
          <dd>allgemein</dd>

          <dt>bez.</dt>
          <dd>bezüglich</dd>
          <dd>bezahlt</dd>

          <dt>zzgl.</dt>
          <dd>zuzüglich</dd>
        </dl>
      `,
      'display: none': endent`
        <style>.hidden { display: none }</style>
        <div>Foo <span class="hidden">bar</span></div>
      `,
      emphasis: '<div>Morbi <em>leo risus</em>, porta ac consectetur ac</div>',
      footer:
        '<footer>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</footer>',
      form: endent`
        <form>
          <label for="input">Input:</label>
          <input id="input" type="text" value="Fermentum Ullamcorper Bibendum" />
          <label>
            Textarea:
            <textarea>Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue. Nullam quis risus eget urna mollis ornare vel eu leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</textarea>
          </label>
          <select>
            <option value="foo" selected>Foo bar</option>
          </select>
          <input type="submit" value="Submit Input" />
          <button type="submit">Submit Button</button>
        </form>
      `,
      header:
        '<header>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</header>',
      headlines: endent`
        <div>
          <h2>Venenatis Inceptos Mattis</h2>
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

          <h2>Tellus Purus Fusce</h2>
          Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </div>
      `,
      'horizontal rule': '<hr>',
      iframe: '<iframe></iframe>',
      img: "<img src=\"data:image/svg+xml,%3Csvg width='1792' height='1792' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z'/%3E%3C/svg%3E\">",
      'inline list elements': endent`
        <ul>
          <li style="display: inline">Foo</li>
          <li style="display: inline">Bar</li>
          <li style="display: inline">Baz</li>
        </ul>
      `,
      italic: '<div>Morbi <i>leo risus</i>, porta ac consectetur ac</div>',
      link: '<div>Morbi <a href="https://google.com">leo risus</a>, porta ac consectetur ac</div>',
      main: '<main>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</main>',
      nav: '<nav>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</nav>',
      'nested containers': endent`
        <main>
          <header>Foo bar</header>
        </main>
      `,
      'ordered list': endent`
        <ol>
          <li>Foo</li>
          <li>Bar</li>
          <li>Baz</li>
        </ol>
      `,
      'override important style': endent`
        <style>
          body a { color: red !important }
        </style>
        <a>Foo bar</a>
      `,
      role: '<div role="navigation">Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>',
      'script tag in body': endent`
        <body>
          <div>
            <script>document.ready(() => {})</script>
            Foo bar
          </div>
        </body>
      `,
      section:
        '<section>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</section>',
      span: '<div>Morbi <span>leo risus</span>, porta ac consectetur ac</div>',
      strong:
        '<div>Morbi <strong>leo risus</strong>, porta ac consectetur ac</div>',
      'style tag in body': endent`
        <body>
          <div>
            <style>a { color: red }</style>
            Foo bar
          </div>
        </body>
      `,
      svg: endent`
        <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/>
        </svg>
      `,
      table: endent`
        <table>
          <tr>
            <th>Foo</th>
            <th>Bar</th>
          </tr>
          <tr>
            <td>Foo</td>
            <td>Bar</td>
          </tr>
          <tr>
            <td>Foo</td>
            <td>Bar</td>
          </tr>
        </table>
      `,
      'table with role': endent`
        <table role="navigation">
          <tr>
            <th>Foo</th>
            <th>Bar</th>
          </tr>
          <tr>
            <td>Foo</td>
            <td>Bar</td>
          </tr>
          <tr>
            <td>Foo</td>
            <td>Bar</td>
          </tr>
        </table>
      `,
      title: endent`
        <head>
          <title>Foo bar</title>
        </head>
        <body>
          <div>Bar baz</div>
        </body>
      `,
      'unordered list': endent`
        <ul>
          <li>Foo</li>
          <li>Bar</li>
          <li>Baz</li>
        </ul>
      `,
    } |> mapValues(screenshotTest)),
  },
  [
    { before: () => execa.command('base prepublishOnly') },
    testerPluginPuppeteer({
      launchOptions: {
        args: [
          `--load-extension=${P.join(process.cwd(), 'dist')}`,
          `--disable-extensions-except=${P.join(process.cwd(), 'dist')}`,
        ],
        headless: false,
      },
    }),
    {
      async beforeEach() {
        // https://github.com/puppeteer/puppeteer/issues/2486#issuecomment-602116047
        const backgroundTarget = await this.browser.waitForTarget(
          t => t.type() === 'background_page'
        )

        const backgroundPage = await backgroundTarget.page()
        await backgroundPage.evaluate(() =>
          window.chrome.tabs.query({ active: true }, tabs =>
            window.chrome.action.onClicked.dispatch(tabs[0])
          )
        )
      },
    },
  ]
)
