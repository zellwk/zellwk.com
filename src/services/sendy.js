import { createSendy } from '@splendidlabz/third-party/sendy'
import { getCurrentUrl, getIpAddress } from './utils.js'

export const sendyLists = {
  mds: '6hZ8N5yHH763fbenJv68UMxQ',
}

export const sendy = createSendy({
  baseURL: 'https://sendy.splendidlabz.com',
  apiKey: import.meta.env.SENDY_API_KEY,
  listId: sendyLists.mds,
  getReferrer: getCurrentUrl,
  getIpAddress,
})
