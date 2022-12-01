import { argv } from 'process'
import { fileURLToPath } from 'url'
import { realpath } from 'fs/promises'

export async function isMain(moduleUrl) {
  const modulePath = fileURLToPath(moduleUrl)
  const realModulePath = await realpath(modulePath)
  const [, mainScriptPath] = argv
  const realScriptPath = await realpath(mainScriptPath)
  return realModulePath === realScriptPath
}
