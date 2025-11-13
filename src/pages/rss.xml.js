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

export const prerender = true

export async function GET(context) {
  const renderers = await loadRenderers([
    svelteContainerRenderer(),
    getMDXRenderer(),
  ])
  const container = await AstroContainer.create({ renderers })

  const blog = await getCollection('blog')
  const posts = await await processFiles(blog)

  const items = posts.map(async (post, index) => {
    // DO NOT MUTATE THE ORIGINAL POST OBJECT IN ANY WAY
    // Because it's going to affect the rest of the build.
    const { Content } = await render(post)

    // Add a content disclaimer to the RSS feed to get people to read the full post on the site for now.
    // post.rssContent = `(Hey, we're having problems showing images in RSS right now, so if you want a better reading experience, consider viewing this article online [here](${context.site}/blog/${post.slug}. We hope to fix this soon!). \n\n ${content}`

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
    title: config.siteTitle,
    description: config.siteDescription,
    site: context.site,
    items: await Promise.all(items),
  })
}
