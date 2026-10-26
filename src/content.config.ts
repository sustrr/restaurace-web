import {
  defineCollection,
  z,
} from "astro:content";

import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/events",
  }),

  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    description: z.string(),
    image: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  events,
};