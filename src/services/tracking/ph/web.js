import posthog from '@splendidlabz/tracking/posthog/web'
import config from '../config'

export const ph = posthog(config.ph)
