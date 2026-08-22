import posthog from '@splendidlabz/tracking/posthog/node'
import config from '../config'

export const ph = posthog(config.ph)
