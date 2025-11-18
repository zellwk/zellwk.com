const framework = 'astro'
export default {
  fb: {
    framework,
    pixelID: '1056736235295035',
    // testEventCode: 'TEST43177',
    capiEndpoint: '/api/tracking/facebook/',
    accessToken: import.meta.env.FB_CAPI_TOKEN,
  },
  ph: {
    framework,
    apiKey: import.meta.env.PUBLIC_POSTHOG_KEY,
    host: 'https://us.i.posthog.com',
    trackEvents: import.meta.env.NODE_ENV === 'production',
  },
}
