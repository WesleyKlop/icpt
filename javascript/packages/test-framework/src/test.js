const executeMaybePromise = async (fn) => {
  const maybePromise = fn()
  if (maybePromise instanceof Promise) {
    await maybePromise
  }
}

export class TestContext {
  constructor(fileName) {
    this.fileName = fileName

    this.tests = new Set()
    this.beforeEach = null
    this.beforeAll = null
    this.afterEach = null
    this.afterAll = null
  }

  async executeBeforeAll() {
    if (typeof this.beforeAll === 'function') {
      await executeMaybePromise(this.beforeAll)
    }
  }
  async executeBeforeEach() {
    if (typeof this.beforeEach === 'function') {
      await executeMaybePromise(this.beforeEach)
    }
  }
  async executeAfterAll() {
    if (typeof this.beforeAll === 'function') {
      await executeMaybePromise(this.afterAll)
    }
  }
  async executeAfterEach() {
    if (typeof this.afterEach === 'function') {
      await executeMaybePromise(this.afterEach)
    }
  }
}
