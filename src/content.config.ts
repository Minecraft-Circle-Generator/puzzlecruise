import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const connections = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/connections" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    game: z.string().default('connections'),
  })
});

const pips = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pips" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    game: z.string().default('pips'),
  })
});

export const collections = { connections, pips };
