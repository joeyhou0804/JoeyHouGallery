# Site Snapshot

This folder stores a static snapshot of https://www.joeyhou.gallery for reference (HTML, CSS, JS, and assets) when planning the rewrite.

## Mirror Commands (run locally)

Option A — wget (recommended):

```
wget --mirror \
  --convert-links \
  --page-requisites \
  --adjust-extension \
  --no-parent \
  --restrict-file-names=unix \
  --domains=joeyhou.gallery,www.joeyhou.gallery \
  --directory-prefix snapshot/joeyhou.gallery \
  https://www.joeyhou.gallery/
```

Option B — Node script (website-scraper):

```
pnpm add -w -D website-scraper

// scripts/snapshot.mjs
import scrape from 'website-scraper';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../snapshot/joeyhou.gallery');

await scrape({
  urls: ['https://www.joeyhou.gallery/'],
  directory: outDir,
  recursive: true,
  maxDepth: 4,
  requestConcurrency: 10,
  urlFilter: (url) => /joeyhou\.gallery/.test(url),
});

// run
node scripts/snapshot.mjs
```

## Notes
- Be mindful of rate limits; keep concurrency low if needed.
- Snapshot is for internal analysis and should not be deployed as-is.

