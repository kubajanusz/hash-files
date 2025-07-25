import * as cp from 'child_process'
import * as path from 'path'
import { test } from '@jest/globals'
import * as process from 'process'
import { getFiles, readFile } from '../src/files'
import { hashHex } from '../src/utils'

test('test sha256', async () => {
  console.info(hashHex('this is content'))
})

test('test sha512', async () => {
  console.info(hashHex('this is content', 'sha512'))
})

test('test readFile', async () => {
  const content = await readFile('./.prettierrc')
  console.info(content)
})

test('test getFiles', async () => {
  const paths = await getFiles('./', ['**/*.ts', '**/package-lock.json'], {
    gitignore: true,
  })
  console.info(paths)
})

test('test runs', () => {
  process.env.INPUT_WORKDIR = './'
  process.env.INPUT_PATTERNS = '**/*.ts\n**/package-lock.json'
  process.env.INPUT_GITIGNORE = 'true'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env,
  }
  console.info(cp.execFileSync(np, [ip], options).toString())
})
