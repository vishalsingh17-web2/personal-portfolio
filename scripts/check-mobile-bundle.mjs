import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const dist = new URL('../dist/', import.meta.url)
const manifest = JSON.parse(readFileSync(new URL('.vite/manifest.json', dist), 'utf8'))
const desktopEntry = 'src/components/visuals/DesktopPhone.tsx'
assert.ok(manifest[desktopEntry]?.isDynamicEntry, 'The desktop phone must remain a lazy entry.')
const seen = new Set()

function visit(key) {
  if (seen.has(key)) return
  seen.add(key)
  const chunk = manifest[key]
  assert.ok(chunk, `Missing manifest entry: ${key}`)
  assert.ok(key !== desktopEntry && chunk.name !== 'three', `Desktop 3D leaked into the mobile dependency graph: ${key}`)
  for (const dependency of chunk.imports ?? []) visit(dependency)
  // Hero and splash load on mobile; the desktop-only lazy boundary does not.
  for (const dependency of chunk.dynamicImports ?? []) {
    if (dependency !== desktopEntry) visit(dependency)
  }
}

visit('index.html')
const compressedBytes = [...seen].reduce((total, key) =>
  total + gzipSync(readFileSync(new URL(manifest[key].file, dist))).length, 0)
console.log(`Mobile bundle check passed: no 3D dependencies; ${(compressedBytes / 1000).toFixed(1)} kB of compressed JavaScript.`)
