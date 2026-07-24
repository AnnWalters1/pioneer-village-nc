#!/usr/bin/env node
// Scans gallery/cabin-*/ and writes assets/cabin-gallery.json mapping
// cabin id -> array of photo paths (relative to site root). Run manually
// or via .github/workflows/build-gallery-manifest.yml on every push.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GALLERY_DIR = path.join(ROOT, 'gallery');
const OUT_FILE = path.join(ROOT, 'assets', 'cabin-gallery.json');
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function buildManifest() {
  const manifest = {};

  if (!fs.existsSync(GALLERY_DIR)) {
    return manifest;
  }

  const cabinFolders = fs.readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^cabin-\d+$/.test(entry.name));

  for (const folder of cabinFolders) {
    const cabinId = folder.name.replace('cabin-', '');
    const folderPath = path.join(GALLERY_DIR, folder.name);

    const photos = fs.readdirSync(folderPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && IMAGE_EXT.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort()
      .map((name) => `gallery/${folder.name}/${name}`);

    if (photos.length > 0) {
      manifest[cabinId] = photos;
    }
  }

  return manifest;
}

const manifest = buildManifest();
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Wrote ${OUT_FILE} with ${Object.keys(manifest).length} cabin(s).`);
