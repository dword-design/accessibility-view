import { property } from '@dword-design/functions'
import browser from 'webextension-polyfill'

const update = enabled =>
  browser.action.setIcon({
    path: `icon${enabled ? '' : '-disabled'}.png`,
  })
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'enabled' in changes) {
    update(changes.enabled.newValue)
  }
})

const init = async () =>
  update(browser.storage.local.get('enabled') |> await |> property('enabled'))
init()
browser.action.onClicked.addListener(async () => {
  const enabled = !(
    browser.storage.local.get('enabled')
    |> await
    |> property('enabled')
  )
  await browser.storage.local.set({ enabled })
})
