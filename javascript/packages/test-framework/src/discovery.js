import fs from 'node:fs/promises'
import path from 'node:path'

export async function* discoverTestFiles(folder) {
  const entries = await fs.readdir(folder, { encoding: 'utf-8', withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.resolve(folder, entry.name)
    // Recursive discovery of tests
    if (entry.isDirectory()) {
      yield* discoverTestFiles(fullPath)
    }
    // Test files must match file-name.test.js
    if (entry.isFile() && entry.name.endsWith('.test.js')) {
      yield fullPath
    }
  }
}
