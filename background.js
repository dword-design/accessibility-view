import { property } from '@dword-design/functions'

browser.browserAction.onClicked.addListener(async () => {
  const enabled = !(
    browser.storage.local.get('enabled')
    |> await
    |> property('enabled')
  )
  await browser.storage.local.set({ enabled })
  chrome.browserAction.setIcon({
    path: `assets/${enabled ? 'icon.png' : 'icon-disabled.png'}`,
  })
})
