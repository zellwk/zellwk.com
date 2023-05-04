import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string().toLowerCase()),

    pubDate: z.date(),
    updateDate: z.date().optional(),
    date: z.date().optional(),

    status: z.string().optional(),
    ckForm: z.string().optional(),
    leadModal: z.string().optional(),
  }),
})

const testimonial = defineCollection({
  schema: z.object({
    jobTitle: z.string(),
    hasImage: z.optional(z.boolean()),
  }),
})

export const collections = { blog, testimonial }
