import { blog, data, partials, testimonials } from '@splendidlabz/astro/content'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const transcripts = defineCollection({
  loader: glob({
    base: './src/content/transcripts',
    pattern: '**/*.md',
  }),
  // createAt/updateAt mirror the vault's frontmatter so a transcript copies
  // over untouched — only `title` gets added when it's published.
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    createAt: z.date(),
    updateAt: z.date().optional(),
    // Set once the companion article is live — renders the exit link at the
    // end of the thread. Transcripts published ahead of the article omit it.
    article: z
      .object({
        title: z.string(),
        url: z.string(),
      })
      .optional(),
  }),
})

export const collections = { blog, partials, testimonials, data, transcripts }
