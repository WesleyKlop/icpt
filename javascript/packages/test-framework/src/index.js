import path from 'path'
import { discoverTestFiles, discoverTestsInFile } from './registry.js'
import { runTestFile } from './runner.js'

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
    const results = { succeeded: 0, failed: 0, total: 0 }
    for await (const [name, test, options] of discoverTestsInFile(file)) {
      const succeeded = await runTestFile(name, test, options)
      results.total++
      if (succeeded === true) {
        results.succeeded++
      } else {
        results.failed++
      }
    }
    fileResults.set(path.relative('.', file), results)
  }

  printTestResults(fileResults)
}
