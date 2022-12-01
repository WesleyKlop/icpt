#!/usr/bin/env node
import { main } from '../src/app.js'
import { isMain } from '@icpt/shared'

if ((await isMain(import.meta.url)) === true) {
  await main()
}
