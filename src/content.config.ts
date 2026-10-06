import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      platforms: z.array(z.enum(['iOS', 'Android'])),
      turnaroundWeeks: z.number(),
      result: z.string(),
      stack: z.array(z.string()),
      cover: image(),
      screens: z.array(image()),
      order: z.number(),
      featured: z.boolean().default(false),
      problem: z.string(),
      build: z.string(),
      resultDetail: z.string(),
    }),
});

export const collections = { work };
