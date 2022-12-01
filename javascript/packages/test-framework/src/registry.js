import fs from 'node:fs/promises'
import path from 'node:path'

let globalTestCollector

export const it = (name, test, options) => {
  globalTestCollector.add([name, test, options])
}

export async function* discoverTestFiles(folder) {
  const entries = await fs.readdir(folder, { encoding: 'utf-8', withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.resolve(folder, entry.name)
    if (entry.isDirectory()) {
      yield* discoverTestFiles(fullPath)
    }
    if (entry.isFile() && entry.name.endsWith('.test.js')) {
      yield fullPath
    }
  }
}

export async function* discoverTestsInFile(file) {
  globalTestCollector = new Set()
  await import(file)
  for (const test of globalTestCollector) {
    yield test
  }
  globalTestCollector.clear()
}
