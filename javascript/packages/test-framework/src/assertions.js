import { AssertionError, DidNotThrowError } from './errors.js'

export function assertEquals(expected, actual, strict = true) {
  if (strict && expected !== actual) {
    throw new AssertionError(expected, actual)
  } else if (!strict && expected != actual) {
    throw new AssertionError(expected, actual)
  }
}

export function assertDeepEquals(expected, actual, strict = true) {
  const keys = new Set(Object.keys(expected).concat(Object.keys(actual)))

  for (const key of keys) {
    if (typeof expected[key] === 'object') {
      assertDeepEquals(expected[key], actual[key], strict)
      // TODO: Handle arrays
    } else {
      assertEquals(expected[key], actual[key], strict)
    }
  }
}

export function assertTrue(actual, strict = true) {
  assertEquals(true, actual, strict)
}

export function assertFalse(actual, strict = true) {
  assertEquals(false, actual, strict)
}

export function assertThrows(fn, expectedCatch) {
  try {
    fn()
    throw new DidNotThrowError()
  } catch (actual) {
    if (typeof expectedCatch !== 'undefined' && !(actual instanceof expectedCatch)) {
      throw new AssertionError(expectedCatch.constructor.name, actual.constructor.name)
    }
  }
}

export async function assertAsyncThrows(fn, expectedCatch) {
  try {
    await fn()
    throw new DidNotThrowError()
  } catch (actual) {
    if (typeof expectedCatch !== 'undefined' && !(actual instanceof expectedCatch)) {
      throw new AssertionError(expectedCatch.constructor.name, actual.constructor.name)
    }
  }
}
