import FB from '@splendidlabz/tracking/fb/node'
import posthog from '@splendidlabz/tracking/posthog/node'
import config from './shared'

export const fb = FB({
  ...config.fb,
  framework: 'astro',
  accessToken: import.meta.env.FB_CAPI_TOKEN,
})

export const ph = posthog({ ...config.ph, framework: 'astro' })
