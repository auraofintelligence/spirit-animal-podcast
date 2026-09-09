import { cpSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const outputRoot = join(process.cwd(), 'dist', 'client');
const nestedRoot = join(outputRoot, 'spirit-animal-podcast');
const nestedAssets = join(nestedRoot, '_next');
const publicAssets = join(outputRoot, '_next');

if (!existsSync(nestedAssets)) {
  throw new Error(`Expected generated assets at ${nestedAssets}`);
}

cpSync(nestedAssets, publicAssets, { recursive: true, force: true });
rmSync(nestedRoot, { recursive: true, force: true });

console.log('GitHub Pages assets are ready at dist/client/_next.');
