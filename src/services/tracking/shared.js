export default {
  fb: {
    pixelID: '1056736235295035',
    testEventCode: 'TEST1873',
  },
  ph: {
    apiKey: import.meta.env.PUBLIC_POSTHOG_KEY,
    host: 'https://us.i.posthog.com',
    trackEvents: import.meta.env.NODE_ENV === 'production',
  },
}
