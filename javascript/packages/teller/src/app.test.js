import { assertEquals, it, assertAsyncThrows, createIoMock } from '@icpt/test-framework'
import { getUserInput } from './app.js'

it('Returns an error when giving invalid input', async () => {
  const streams = createIoMock('-5\n')
  await assertAsyncThrows(async () => {
    await getUserInput(streams)
  })
})

it('Returns a valid number when giving valid input', async () => {
  const streams = createIoMock('1337\n')
  const expected = 1337
  const actual = await getUserInput(streams)

  assertEquals(expected, actual)
})

