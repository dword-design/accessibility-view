import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  snapshotPathTemplate:
    '{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}',
});
