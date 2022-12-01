import { TestError } from './errors.js'

export async function runTestFile(name, test, options = {}) {
  try {
    const result = test()
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
