import { browser } from 'wxt/browser'

import styleCode from '@/assets/style.scss?inline'

const toggle = enabled => {
  let style = document.querySelector('style.accessibility-view')
  if (style) {
    style.remove()
  }
  if (enabled) {
    style = document.createElement('style')
    style.classList.add('accessibility-view')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styleCode))
    document.getElementsByTagName('head')[0].appendChild(style)
  }
}

export default defineContentScript({
  matches: ['<all_urls>'],
  main: async () => {
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && 'enabled' in changes) {
        toggle(changes.enabled.newValue)
      }
    })

    toggle((await browser.storage.local.get('enabled')).enabled)
  },
})
