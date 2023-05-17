import { Readable } from 'node:stream'
import { createWriteStream } from 'node:fs'

export const createIoMock = (input, output = '/dev/null') => ({
  stdin: Readable.from(Array.isArray(input) ? input : [input]),
  stdout: createWriteStream(output),
})
