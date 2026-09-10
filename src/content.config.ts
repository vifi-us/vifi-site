import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ base: "./src/content/legal", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    effectiveDate: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const faqs = defineCollection({
  loader: glob({ base: "./src/content/faqs", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    question: z.string(),
    order: z.number().default(0),
    category: z.string().default("general"),
  }),
});

const resources = defineCollection({
  loader: glob({ base: "./src/content/resources", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    heading: z.string().trim().min(1),
    version: z.string().regex(/^v[1-9]\d*$/),
    publishedAt: z.coerce.date(),
    scenarios: z.array(z.object({
      title: z.string().trim().min(1),
      criterion: z.string().trim().min(1),
    })).length(7),
  }),
});

export const collections = { blog, legal, faqs, resources };
