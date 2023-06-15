import { normalize, stripMore, toHTML } from '../utils/content.js'

import config from '../../site-config.js'
import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import { toSentence } from '@zellwk/javascript/utils/convert-case.js'

export const prerender = true

// We may want to use this method to fix RSS: https://scottwillsey.com/rss-pt2/

export async function get(context) {
  const files = await getCollection('blog')
  const normalized = normalize(files)

  const items = normalized.map(async (post, index) => {
    // DO NOT MUTATE THE ORIGINAL POST OBJECT IN ANY WAY
    // Because it's going to affect the rest of the build.
    const content = stripMore(post.body)

    // Add a content disclaimer to the RSS feed to get people to read the full post on the site for now.
    post.rssContent = `(Hey, we're having problems showing images in RSS right now, so if you want a better reading experience, consider viewing this article online [here](${context.site}/blog/${post.slug}. We hope to fix this soon!). \n\n ${content}`

    const data = {
      link: `/blog/${post.slug}/`,
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,

      // Astro doesn't support MDX yet, so we parse the body with a normal markdown parser — this means images and other fancy stuff don't work here yet.
      content: toHTML(post.rssContent, { sanitizeHTML: false }),
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
