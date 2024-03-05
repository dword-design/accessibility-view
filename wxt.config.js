import { defineConfig } from 'wxt';
import babel from 'vite-plugin-babel'

export default defineConfig({
  manifest: {
    action: {},
    permissions: ['storage'],
  },
  vite: () => ({
    plugins: [babel()],
  }),
});
