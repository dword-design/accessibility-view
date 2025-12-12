import { browser } from 'wxt/browser';

export default defineBackground(async () => {
  const update = (enabled: boolean) =>
    browser.action.setIcon({
      path: `icon${enabled ? '' : '-disabled'}-128.png`,
    });

  browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && 'enabled' in changes) {
      update(changes.enabled.newValue);
    }
  });

  browser.action.onClicked.addListener(async () => {
    const { enabled } = await browser.storage.local.get('enabled');
    await browser.storage.local.set({ enabled: !enabled });
  });

  const { enabled } = await browser.storage.local.get('enabled');
  update(enabled);
});
