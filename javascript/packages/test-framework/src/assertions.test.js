import { assertEquals, it, assertThrows } from '@icpt/test-framework'

it('works with assertEquals', async () => {
  assertThrows(() => {
    assertEquals(true, false)
  })

  assertEquals(true, true)

  assertEquals(0, false, false)

  const obj = { foo: 'bar' }
  const baz = obj
  baz.foo = 'blar'
  assertEquals(obj, baz)
})
