export class AssertionError extends Error {
  constructor(expected, actual) {
    super('Assertion failed')
    this.a = expected
    this.b = actual
  }
}

export function assertEquals(a, b, strict = true) {
  if (strict && a !== b) {
    throw new AssertionError(a, b)
  } else if (!strict && a != b) {
    throw new AssertionError(a, b)
  }
}
