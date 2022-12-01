export class TestError extends Error {}
export class AssertionError extends TestError {
  constructor(expected, actual) {
    super('Assertion failed')
    this.a = expected
    this.b = actual
  }
}

export class DidNotThrowError extends TestError {
  constructor() {
    super('Expected function to throw, but it did not.')
  }
}
