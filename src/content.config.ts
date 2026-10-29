
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const optionalDate = () =>
  z.preprocess(
    (value) =>
      value === '' || value === null ? undefined : value,
    z.coerce.date().optional()
  );


const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: optionalDate(),
    description: z.string(),
    image: z.string().optional(),
    published: z.boolean().default(true),

    visibleFrom: optionalDate(),
    visibleUntil: optionalDate(),
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
        noLunchMenu: z.boolean().default(false),
        message: z.string().optional(),
        soups: z.array(
          z.object({
            name: z.string(),
          })
        ).default([]),
        meals: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
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
    allDay: z.boolean().default(true),

    startDate: z.string(),
    endDate: z.string().optional(),

    reopenDate: optionalDate(),
    reopenTime: z.string().optional(),

    reason: z.string().optional(),

    visibleFrom: optionalDate(),
    visibleUntil: optionalDate(),

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



const foodMenu = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/foodMenu',
  }),
  schema: z.object({
    categories: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        published: z.boolean().default(true),
        items: z.array(
          z.object({
            code: z.string().optional(),
            name: z.string(),
            description: z.string().optional(),
            portion: z.string().optional(),
            halfPortionAvailable: z.boolean().default(false),
            price: z.number(),
            allergens: z.array(z.number()).default([]),
            published: z.boolean().default(true),
          })
        ),
      })
    ),
    notes: z.array(
      z.object({
        text: z.string(),
      })
    ).default([]),
  }),
});

const drinkMenu = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/drinkMenu",
  }),
  schema: z.object({
    categories: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        published: z.boolean().default(true),
        items: z.array(
          z.object({
            code: z.string().optional(),
            name: z.string(),
            description: z.string().optional(),
            variants: z.array(
              z.object({
                volume: z.string().optional(),
                price: z.number(),
              }),
            ).min(1),
            allergens: z.array(z.number()).default([]),
            published: z.boolean().default(true),
          }),
        ),
      }),
    ),
    notes: z.array(
      z.object({
        title: z.string(),
        text: z.string(),
      }),
    ).default([]),
  }),
});



export const collections = {
  events,
  weeklyMenu,
  notices,
  services,
  foodMenu,
  drinkMenu
};
