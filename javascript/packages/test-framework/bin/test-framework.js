#!/usr/bin/env node
import { argv } from 'process'
import path from 'path'
import { isMain } from '@icpt/shared'
import { startTestSuite } from '../src/index.js'

if ((await isMain(import.meta.url)) === true) {
  const whereToDiscoverTests = argv[2]
  await startTestSuite(path.resolve('.', whereToDiscoverTests))
}
