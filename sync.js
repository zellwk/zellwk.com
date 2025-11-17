import 'dotenv/config'

import { sync } from '@splendidlabz/devops'
import config from './site-config.js'

sync('dist', config.syncDestination)
sync('.env', config.syncDestination)
