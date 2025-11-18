import FB from '@splendidlabz/tracking/fb/web'
import posthog from '@splendidlabz/tracking/posthog/web'
import config from './config'

export const fb = FB(config.fb)
export const ph = posthog(config.ph)
