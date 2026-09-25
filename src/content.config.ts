import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    platform: z.enum(['browser', 'android', 'psp']),
    status: z.enum(['wip', 'released', 'archived']),
    date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'date は YYYY-MM 形式で書いてください'),
    summary: z.string().max(40, 'summary は40字以内'),
    tech: z.array(z.string()).default([]),
    thumbnail: z.string().optional(),
    links: z
      .object({
        play: z.string().nullish(),
        store: z.string().nullish(),
        video: z.string().nullish(),
        repo: z.string().nullish(),
      })
      .default({}),
    featured: z.boolean().default(false),
  }),
});

export const collections = { works };
