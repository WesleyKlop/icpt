import path from 'node:path'
import cluster from 'node:cluster'
import { createTestContext } from './context.js'
import { discoverTestFiles } from './discovery.js'
import { executeTestsInContext } from './runner.js'

const printTestResults = (resultsByFile) => {
  console.log('\n\nSUMMARY\n-------')
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
  const waitGroup = []
  const fileResults = new Map()
  for await (const file of discoverTestFiles(folder)) {
    const worker = cluster.fork()
    worker
      .on('message', (message) => {
        if (message.type === 'test-results') {
          fileResults.set(path.relative('.', file), message.results)
        } else if (message.type === 'ready') {
          worker.send({ type: 'exec-test', file })
        }
      })
      .on('error', (...args) => {
        console.log(args)
      })
    waitGroup.push(new Promise((res) => worker.on('exit', () => res())))
  }

  await Promise.all(waitGroup)
  printTestResults(fileResults)
}
