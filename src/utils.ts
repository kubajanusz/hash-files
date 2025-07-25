import crypto, { BinaryLike } from 'crypto'
import * as core from '@actions/core'

export function getInput(name: string, options?: core.InputOptions): string {
  return core.getInput(name, options)
}

export function getInputAsArray(
  name: string,
  options?: core.InputOptions,
): string[] {
  return core
    .getInput(name, options)
    .split('\n')
    .map((s) => s.replace(/^!\s+/, '!').trim())
    .filter((x) => x !== '')
}

export function getInputAsInt(
  name: string,
  options?: core.InputOptions,
): number | undefined {
  const value = Number.parseInt(core.getInput(name, options), 10)
  if (Number.isNaN(value) || value < 0) {
    return undefined
  }
  return value
}

export function getInputAsBool(
  name: string,
  options?: core.InputOptions,
): boolean {
  const result = core.getInput(name, options)
  return result.toLowerCase() === 'true'
}

export function hashHex(content: BinaryLike, shaAlgorithm = 'sha256'): string {
  return crypto.createHash(shaAlgorithm).update(content).digest('hex')
}

export async function hashHexAsync(
  content: BinaryLike,
  shaAlgorithm = 'sha256',
): Promise<string> {
  return new Promise((RES) => {
    RES(hashHex(content, shaAlgorithm))
  })
}
