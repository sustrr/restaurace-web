
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    description: z.string(),
    image: z.string().optional(),
    published: z.boolean().default(true),

    visibleFrom: z.date().optional(),
    visibleUntil: z.date().optional(),
  }),
});

const weeklyMenu = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/weekly-menu',
  }),
  schema: z.object({
    title: z.string(),
    weekStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    published: z.boolean().default(false),

    days: z.array(
      z.object({
        day: z.enum([
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
        ]),
        closed: z.boolean().default(false),
        soup: z.string().optional(),
        meals: z.array(
          z.object({
            name: z.string(),
            price: z.number().nonnegative(),
            allergens: z.string().optional(),
          })
        ).default([]),
      })
    ).default([]),
  }),
});


const notices = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/notices',
  }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['closed', 'private-event']),
    startDate: z.string(),
    endDate: z.string().optional(),
    reason: z.string().optional(),
    visibleFrom: z.coerce.date().optional(),
    visibleUntil: z.coerce.date().optional(),
    published: z.boolean().default(false),
  }),
});


const services = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/services',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    order: z.number().default(0),
    published: z.boolean().default(true),
  }),
});



export const collections = {
  events,
  weeklyMenu,
  notices,
  services,
};
