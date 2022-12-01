import { TestError } from './errors.js'
import { TestContext } from './test.js'

export async function runTestFile(name, test, options = {}) {
  try {
    const result = test(options.args)
    if (result instanceof Promise) {
      await result
    }
    process.stdout.write('.')
    return true
  } catch (err) {
    process.stderr.write('F')
    // if (err instanceof AssertionError) {
    // console.error(`[${name}]`, err.message)
    // console.log(' - expected:', err.a)
    // console.log(' -   actual:', err.b)
    // }
    if (!(err instanceof TestError)) {
      throw err
    }
  }
  return false
}

/**
 * @param {TestContext} context
 */
export async function executeTestsInContext(context) {
  const results = { succeeded: 0, failed: 0, total: context.tests.size }

  await context.executeBeforeAll()

  for (const [name, test, options] of context.tests) {
    // This could be edited to have a timeout, retries, etc.
    await context.executeBeforeEach()
    const succeeded = await runTestFile(name, test, options)

    if (succeeded === true) {
      results.succeeded++
    } else {
      results.failed++
    }

    await context.executeAfterEach()
  }

  await context.executeAfterAll()

  return results
}
