import { createSendy } from '@splendidlabz/third-party/sendy'
import { getCurrentUrl, getIpAddress } from './utils.js'

export const lists = {
  main: '6hZ8N5yHH763fbenJv68UMxQ',
  practicalAstro: 'IAOYAidfjLzdbdRS7d892Tgg',
  practicalAstroPurchase: '',
  contentSystemPurchase: '',
  imageSystemPurchase: '',
}

export const sendy = createSendy({
  baseURL: 'https://sendy.splendidlabz.com',
  apiKey: import.meta.env.SENDY_API_KEY,
  getReferrer: getCurrentUrl,
  getIpAddress,
})
