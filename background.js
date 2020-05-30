import { property } from '@dword-design/functions'

const update = enabled =>
  browser.browserAction.setIcon({
    path: `assets/icon${enabled ? '' : '-disabled'}.svg`,
  })

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'enabled' in changes) {
    update(changes.enabled.newValue)
  }
})

const init = async () =>
  update(browser.storage.local.get('enabled') |> await |> property('enabled'))

init()

browser.browserAction.onClicked.addListener(async () => {
  const enabled = !(
    browser.storage.local.get('enabled')
    |> await
    |> property('enabled')
  )
  await browser.storage.local.set({ enabled })
})
