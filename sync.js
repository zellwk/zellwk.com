import 'dotenv/config'

import config from './site-config.js'
import sync from '@zellwk/devops/sync.js'

sync('dist', config.syncDestination)
