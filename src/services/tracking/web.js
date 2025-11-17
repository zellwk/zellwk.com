import FB from '@splendidlabz/tracking/fb/web'
import posthog from '@splendidlabz/tracking/posthog/web'
import config from './shared'

export const fb = FB({
  ...config.fb,
  capiEndpoint: '/api/tracking/facebook/',
})

export const ph = posthog(config.ph)
