import styleCode from './assets/style.scss'

const toggle = () => {
  let style = document.querySelector('style.accessibility-mode')
  if (style) {
    style.remove()
  } else {
    style = document.createElement('style')
    style.classList.add('accessibility-mode')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styleCode))
    document.getElementsByTagName('head')[0].appendChild(style)
  }
}

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'enabled' in changes) {
    toggle()
  }
})

const init = async () => {
  if (await browser.storage.local.get('enabled')) {
    toggle()
  }
}

init()
