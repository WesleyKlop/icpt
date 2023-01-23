#!/usr/bin/env node
import process from 'node:process'
import cluster from 'node:cluster'
import path from 'node:path'
import { isMain } from '@icpt/shared'
import { startTestSuite } from '../src/index.js'
import { createTestContext } from '../src/context.js'
import { executeTestsInContext } from '../src/runner.js'

if ((await isMain(import.meta.url)) === true && cluster.isPrimary) {
  const whereToDiscoverTests = process.argv[2] ?? '.'
  await startTestSuite(path.resolve('.', whereToDiscoverTests))
}

if (cluster.isWorker) {
  process.send({ type: 'ready' })
  process.on('message', async (message) => {
    if (message.type === 'exec-test') {
      const context = await createTestContext(message.file)
      const results = await executeTestsInContext(context)
      process.send({ type: 'test-results', results })
      process.exit(0)
    }
  })
}
