import { browser } from 'wxt/browser'

const update = enabled =>
  browser.action.setIcon({
    path: `icon${enabled ? '' : '-disabled'}.png`,
  })

export default defineBackground(async () => {
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && 'enabled' in changes) {
      update(changes.enabled.newValue)
    }
  })

  update((await browser.storage.local.get('enabled')).enabled)

  browser.action.onClicked.addListener(async () => {
    const enabled = !(await browser.storage.local.get('enabled')).enabled
    await browser.storage.local.set({ enabled })
  })
})
