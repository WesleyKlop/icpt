import { TestError, AbortError, AssertionError } from './errors.js'
import { TestContext } from './test.js'

export async function runTestFile(name, test, options = {}) {
  try {
    const result = test(options.args)
    if (result instanceof Promise) {
      await result
    }
    process.stdout.write('.')
    return 'succeeded'
  } catch (err) {
    if (err instanceof AbortError) {
      return 'aborted'
    }
    process.stderr.write('F')
    // if (err instanceof AssertionError) {
    //   console.error(`[${name}]`, err.message)
    //   console.log(' - expected:', err.a)
    //   console.log(' -   actual:', err.b)
    // }
    if (!(err instanceof TestError)) {
      throw err
    }
  }
  return 'failed'
}

/**
 * @param {TestContext} context
 */
export async function executeTestsInContext(context) {
  const results = {
    succeeded: 0,
    failed: 0,
    skipped: 0,
    total: context.tests.size,
  }

  await context.executeBeforeAll()

  for (const [name, test, options] of context.tests) {
    if (options?.skip === true) {
      results.skipped++
      continue // skip this test
    }
    // This could be edited to have a timeout, retries, etc.
    await context.executeBeforeEach()
    const result = await runTestFile(name, test, options)
    await context.executeAfterEach()

    if (result === 'aborted') {
      break // stop running tests
    }
    results[result]++
  }

  await context.executeAfterAll()

  return results
}
