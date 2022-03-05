import sync from '@zellwk/devops/sync.js'
import dotenv from 'dotenv'
dotenv.config({ path: './secrets/variables.env' })

sync('dist', '/var/www/zellwk.com')

if (process.env.NODE_ENV !== 'ci') {
  sync('./secrets', '/var/www/zellwk.com')
}
