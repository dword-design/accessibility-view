import { browser } from 'wxt/browser';

import styleCode from '@/assets/style.scss?inline';

export default defineContentScript({
  main: async () => {
    const toggle = (enabled: boolean) => {
      let style = document.querySelector<HTMLStyleElement>(
        'style.accessibility-view',
      );

      if (style) {
        style.remove();
      }

      if (enabled) {
        style = document.createElement('style');
        style.classList.add('accessibility-view');
        style.append(document.createTextNode(styleCode));
        document.querySelectorAll('head')[0].append(style);
      }
    };

    browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && 'enabled' in changes) {
        toggle(changes.enabled.newValue);
      }
    });

    const { enabled } = await browser.storage.local.get('enabled');
    toggle(enabled);
  },
  matches: ['<all_urls>'],
});
