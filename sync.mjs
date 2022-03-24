import sync from '@zellwk/devops/sync.js'
import dotenv from 'dotenv'
dotenv.config({ path: './secrets/variables.env' })

const destination = '/var/www/zellwk.com'
sync('dist', destination)

if (process.env.NODE_ENV !== 'ci') {
  sync('./secrets', destination)
}
