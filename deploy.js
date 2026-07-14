import 'dotenv/config'

import { spawn } from 'node:child_process'
import config from './site-config.js'

const { SSH_USER, SSH_HOST, SSH_PORT } = process.env
const dir = config.syncDestination

const missing = ['SSH_USER', 'SSH_HOST', 'SSH_PORT'].filter(
  key => !process.env[key],
)

if (missing.length) {
  console.error(`Missing env variables: ${missing.join(', ')}`)
  process.exit(1)
}

await run('node', ['sync.js'])

await run('ssh', [
  '-p',
  SSH_PORT,
  `${SSH_USER}@${SSH_HOST}`,
  [
    `cd ${dir}`,
    'git fetch origin',
    'git reset --hard origin/master',
    'npm install',
    'npm run restart',
  ].join(' && '),
])

console.log(`Deployed to ${SSH_HOST}`)

/**
 * Runs a command and resolves when it exits successfully.
 * @param {String} command
 * @param {String[]} args
 */
function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })

    child.on('error', reject)
    child.on('close', code => {
      if (code === 0) return resolve()
      reject(new Error(`${command} exited with code ${code}`))
    })
  })
}
