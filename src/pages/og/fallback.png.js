import { createOGImage } from '@splendidlabz/og'
import config from '../../../site-config.js'
import ogStyles from '../../styles/og-styles.css?raw'

export async function GET() {
  const image = await createOGImage({
    slug: 'fallback',
    fonts: [
      {
        name: 'June Expt',
        path: '/public/fonts/june-expt-variable.woff2',
      },
    ],
    styles: ogStyles,
    body: `<h1>${config.site.title}</h1>`,
  })

  return new Response(image, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
