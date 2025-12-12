import { defineWebExtConfig } from 'wxt';

export default defineWebExtConfig({
  chromiumArgs: ['https://de.wikipedia.org'],
  chromiumProfile: 'userdata', // chromiumArgs: ['--user-data-dir=userdata'] doesn't keep sessions across dev restarts,
  keepProfileChanges: true,
});
