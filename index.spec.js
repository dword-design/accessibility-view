import { endent, mapValues } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import execa from 'execa'
import express from 'express'
import P from 'path'

const screenshotTest = test =>
  async function () {
    const server = express()
      .get('/', (req, res) => res.send(test.html))
      .listen(3000)
    try {
      await this.page.goto('http://localhost:3000')

      const list = await this.page.waitForSelector(test.selector)
      expect(await list.screenshot()).toMatchImageSnapshot(this)
    } finally {
      await server.close()
    }
  }

export default tester(
  {
    ...({
      headlines: {
        html: endent`
          <div>
            <h2>Venenatis Inceptos Mattis</h2>
            Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

            <h2>Tellus Purus Fusce</h2>
            Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          </div>
        `,
        selector: 'div',
      },
      link: {
        html: '<div>Morbi <a href="https://google.com">leo risus</a>, porta ac consectetur ac',
        selector: 'div',
      },
      main: {
        html: '<main>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</main>',
        selector: 'main',
      },
      nav: {
        html: '<nav>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</nav>',
        selector: 'nav',
      },
      role: {
        html: '<div role="navigation">Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>',
        selector: 'div',
      },
      'unordered list': {
        html: endent`
          <ul>
            <li>Foo</li>
            <li>Bar</li>
            <li>Baz</li>
          </ul>
        `,
        selector: 'ul',
      },
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
        await backgroundPage.evaluate(() => {
          window.chrome.tabs.query({ active: true }, tabs =>
            window.chrome.browserAction.onClicked.dispatch(tabs[0])
          )
        })
      },
    },
  ]
)
