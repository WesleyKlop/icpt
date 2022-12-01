import { TestContext } from './test.js'

/** @type {TestContext?} currentTestContext */
let currentTestContext

export const it = (name, test, options) => {
  currentTestContext.tests.add([name, test, options])
}

it.each = (argsList) => (name, test, options) => {
  for (const args of argsList) {
    currentTestContext.tests.add([name, test, { ...options, args }])
  }
}

export const beforeEach = (cb) => (currentTestContext.beforeEach = cb)
export const beforeAll = (cb) => (currentTestContext.beforeAll = cb)
export const afterEach = (cb) => (currentTestContext.afterEach = cb)
export const afterAll = (cb) => (currentTestContext.afterAll = cb)

export async function createTestContext(file) {
  // All exposed test handlers will collect their params in the context
  currentTestContext = new TestContext()
  await import(file)
  // So we can use that context later.
  return currentTestContext
}
