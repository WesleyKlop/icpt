import path from 'node:path'
import cluster from 'node:cluster'
import { discoverTestFiles } from './discovery.js'

const printTestResults = (resultsByFile) => {
  console.log('\n\nSUMMARY\n-------')
  for (const [file, results] of resultsByFile.entries()) {
    console.log(
      `[${file}] ${results.succeeded}/${results.total} succeeded. ${results.failed} failed.`,
    )
  }
}

function createWork(worker, file, onResult) {
  return new Promise((res, rej) => {
    worker
      .on('message', (message) => {
        switch (message.type) {
          case 'test-results':
            onResult(message.results)
            break
          case 'ready':
            worker.send({ type: 'exec-test', file })
            break
        }
      })
      .on('error', (err) => rej(err))
      .on('exit', (code) => {
        if (code !== 0) {
          rej(new Error(`Worker stopped with exit code ${code}`))
        }
        res()
      })
  })
}

/**
 * Start the test suite, execute the tests and print a summary
 *
 * @param {string} folder where to find test files
 */
export async function startTestSuite(folder) {
  const waitGroup = []
  const fileResults = new Map()
  for await (const file of discoverTestFiles(folder)) {
    const relName = path.relative(folder, file)
    // Fork a new process for each test file
    const work = createWork(cluster.fork(), file, (result) => {
      fileResults.set(relName, result)
    })
    waitGroup.push(work)
  }

  await Promise.allSettled(waitGroup)
  printTestResults(fileResults)
}
