import { argv } from 'node:process'
import { fileURLToPath } from 'node:url'
import { realpath } from 'node:fs/promises'

export async function isMain(moduleUrl) {
  const modulePath = fileURLToPath(moduleUrl)
  const realModulePath = await realpath(modulePath)
  const [, mainScriptPath] = argv
  const realScriptPath = await realpath(mainScriptPath)
  return realModulePath === realScriptPath
}
