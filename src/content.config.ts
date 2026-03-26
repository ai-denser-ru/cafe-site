import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Agentic CMS — Content Collections Schema
 * 6 entities: pages, nodes, blocks, taxonomy, staff, settings
 */

// --- Pages ---
// Unique pages with complex layouts (Home, About, Contacts)
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    layout: z.string().optional().default('default'),
    draft: z.boolean().optional().default(false),
  }),
});

// --- Nodes ---
// Typed content items (menu items, yoga classes, news)
const nodes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/nodes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(['menu_item', 'class', 'news']).default('news'),
    image: z.string().optional(),
    price: z.string().optional(),
    date: z.coerce.date().optional(),
    draft: z.boolean().optional().default(false),
    taxonomies: z.array(z.string()).optional().default([]),
  }),
});

// --- Blocks ---
// Reusable fragments (promos, testimonials, CTAs)
const blocks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blocks' }),
  schema: z.object({
    title: z.string(),
    block_type: z.enum(['promo', 'testimonial', 'cta']).default('promo'),
    placement: z.string().optional().default('sidebar'),
    weight: z.number().optional().default(0),
    active: z.boolean().optional().default(true),
  }),
});

// --- Taxonomy ---
// Dictionaries and terms for grouping content
const taxonomy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/taxonomy' }),
  schema: z.object({
    title: z.string(),
    vocabulary: z.enum(['category', 'level', 'tag']).default('category'),
    weight: z.number().optional().default(0),
  }),
});

// --- Staff ---
// Employee profiles (chefs, trainers)
const staff = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/staff' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    image: z.string().optional(),
    email: z.string().email().optional(),
    order: z.number().optional().default(0),
  }),
});

// --- Settings ---
// Global configurations in JSON (navigation, business hours, contacts)
const settings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/settings' }),
  schema: z.object({
    id: z.string(),
  }).passthrough(),
});

export const collections = {
  pages,
  nodes,
  blocks,
  taxonomy,
  staff,
  settings,
};
