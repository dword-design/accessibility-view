import { property } from '@dword-design/functions'
import styleCode from './assets/style.scss'

const toggle = enabled => {
  let style = document.querySelector('style.accessibility-mode')
  if (!enabled && style) {
    style.remove()
  } else if (enabled && !style) {
    style = document.createElement('style')
    style.classList.add('accessibility-mode')
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
