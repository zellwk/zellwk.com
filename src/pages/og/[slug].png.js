import { processFiles } from '@splendidlabz/astro/content'
import { getCollection } from 'astro:content'
import ogStyles from '../../styles/og-styles.css?raw'
import { createOGImage } from './utils.js'

export async function getStaticPaths() {
  const files = await getCollection('blog')
  const posts = await processFiles(files)

  return posts.map(post => ({
    params: { slug: post.data.slug },
    props: {
      title: post.data.title,
      description: post.data.description || '',
    },
  }))
}

export async function GET({ props, params }) {
  const { slug } = params
  const { title } = props

  const image = await createOGImage({
    slug,
    fonts: [
      {
        name: 'June Expt',
        path: '/public/fonts/june-expt-variable.woff2',
      },
    ],
    styles: ogStyles,
    body: `<h1>${title}</h1>`,
  })

  return new Response(image, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
