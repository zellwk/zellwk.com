import FB from '@splendidlabz/tracking/fb/node'
import posthog from '@splendidlabz/tracking/posthog/node'
import config from './config'

export const fb = FB(config.fb)
export const ph = posthog(config.ph)
