import path from 'node:path'
import { createTestContext } from './context.js'
import { discoverTestFiles } from './discovery.js'
import { executeTestsInContext } from './runner.js'

const printTestResults = (resultsByFile) => {
  console.log('\nSUMMARY\n-------')
  for (const [file, results] of resultsByFile.entries()) {
    console.log(
      `[${file}] ${results.succeeded}/${results.total} succeeded. ${results.failed} failed.`,
    )
  }
}

/**
 * Start the test suite, execute the tests and print a summary
 *
 * @param {string} folder where to find test files
 */
export const startTestSuite = async (folder) => {
  const fileResults = new Map()
  for await (const file of discoverTestFiles(folder)) {
    const context = await createTestContext(file)
    const results = await executeTestsInContext(context)

    fileResults.set(path.relative('.', file), results)
  }

  printTestResults(fileResults)
}
