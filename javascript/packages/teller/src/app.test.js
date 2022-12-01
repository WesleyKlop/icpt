import {
  assertEquals,
  assertDeepEquals,
  assertAsyncThrows,
  createIoMock,
  it,
} from '@icpt/test-framework'
import { calculate, format, formatParts, getUserInput, InvalidInputError } from './app.js'

it('returns an error when giving invalid input', async () => {
  const streams = createIoMock('-5\n')
  await assertAsyncThrows(async () => {
    await getUserInput(streams)
  }, InvalidInputError)
})

it('returns a valid number when giving valid input', async () => {
  const streams = createIoMock('1337\n')
  const expected = 1337
  const actual = await getUserInput(streams)

  assertEquals(expected, actual)
})

it('can calculate the correct parts with a given amount of seconds', () => {
  const inputSeconds = 2_147_483_647 // max 32-bit signed integer, just for fun
  const expected = {
    years: 68,
    months: 1,
    days: 1,
    hours: 13,
    minutes: 40,
    seconds: 47,
  }
  const actual = calculate(inputSeconds)

  assertDeepEquals(expected, actual)
})

it.each([
  ['0 bar', 0, 'foo', 'bar'],
  ['1 foo', 1, 'foo', 'bar'],
  ['2 bar', 2, 'foo', 'bar'],
])(
  'formats a singular or plural based on a given amount',
  ([expected, count, singular, plural]) => {
    const actual = format(count, singular, plural)
    assertEquals(expected, actual)
  },
)

it('formats the correct date and time using a given amount of seconds', () => {
  const parts = {
    years: 68,
    months: 1,
    days: 1,
    hours: 13,
    minutes: 40,
    seconds: 47,
  }
  const expected = '68 jaren, 1 maand, 1 dag, 13 uren, 40 minuten en 47 seconden'
  const actual = formatParts(parts)

  assertEquals(expected, actual)
})
