import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx'
import { getContainerRenderer as svelteContainerRenderer } from '@astrojs/svelte'
import { components } from '../components/blogPostComponents.js'

import rss from '@astrojs/rss'
import { processFiles } from '@splendidlabz/astro/content'
import { toSentence } from '@splendidlabz/utils'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { loadRenderers } from 'astro:container'
import { getCollection, render } from 'astro:content'
import config from '../../site-config.js'

export async function GET(context) {
  const renderers = await loadRenderers([
    svelteContainerRenderer(),
    getMDXRenderer(),
  ])
  const container = await AstroContainer.create({ renderers })

  const blog = await getCollection('blog')
  const posts = await await processFiles(blog)
  const items = posts.map(async (post, index) => {
    const { Content } = await render(post)
    const data = {
      link: new URL(`/blog/${post.slug}`, context.url.origin).toString(),
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      content: await container.renderToString(Content, {
        props: { components },
      }),
      customData: post.data.tags
        .map(category => `<category>${toSentence(category)}</category>`)
        .join(''),
    }
    return data
  })

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    items: await Promise.all(items),
  })
}
