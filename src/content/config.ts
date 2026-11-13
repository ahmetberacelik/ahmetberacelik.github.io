import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'tr']),
    projectSlug: z.string(),
    title: z.string(),
    tagline: z.string(),
    year: z.string(),
    meta: z.string(),
    summary: z.string(),
    techLine: z.string().optional(),
    tags: z.array(z.string()).min(4).max(6),
    repos: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
    facts: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .default([]),
    media: z
      .array(
        z.object({
          type: z.enum(['video', 'image']),
          src: z.string(),
          alt: z.string(),
          captionTitle: z.string(),
          captionSub: z.string().optional(),
          orientation: z.enum(['landscape', 'portrait']).optional(),
        })
      )
      .default([]),
    technicalDetailsTitle: z.string().optional(),
    technicalDetails: z.array(z.string()).default([]),
    order: z.number().int().min(1).max(7),
    featured: z.boolean(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
