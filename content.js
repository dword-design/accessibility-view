import { property } from '@dword-design/functions'
import styleCode from './assets/style.scss'

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

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'enabled' in changes) {
    toggle(changes.enabled.newValue)
  }
})

const init = async () =>
  toggle(browser.storage.local.get('enabled') |> await |> property('enabled'))

init()
