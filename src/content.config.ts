import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dwa = (min = 1, max = 400) =>
  z.object({ pl: z.string().min(min).max(max), en: z.string().min(min).max(max) });

const rozwiazania = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rozwiazania' }),
  schema: z.object({
    nazwa: z.string().regex(/^Smart[A-Z]/),
    order: z.number().int(),
    kolor: z.enum(['sun', 'sage', 'sky', 'rose']),
    litera: z.string().length(1),
    tagline: dwa(5, 60),
    problem: dwa(),
    jak: dwa(),
    efekt: dwa(),
    wdrozenie: dwa(1, 30),
    opisUrl: z.string().url().or(z.literal('')).default(''), // link do opisu na www
    przyklad: z.boolean().default(false), // true = karta przykładowa, pokazuje znacznik
    draft: z.boolean().default(true),
  }),
});

const blok = z.object({ t: z.string(), d: z.string().optional() });
const sekcja = z.object({
  title: z.string(),
  lead: z.string().optional(),
  items: z.array(blok).min(1),
});
const strona = z.object({
  title: z.string().min(20).max(70),
  description: z.string().min(80).max(160),
  eyebrow: z.string(),
  heroTitle: z.string(),
  lead: z.string(),
  facts: z.array(z.object({ v: z.string(), l: z.string() })).max(4).default([]),
  problem: sekcja,
  solution: sekcja,
  steps: sekcja,
  benefits: sekcja,
  extras: sekcja.optional(),
  start: sekcja.optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  cta: z.object({ title: z.string(), text: z.string() }),
});

// Własna strona opisowa rozwiązania. Nazwa pliku = nazwa pliku karty w `rozwiazania` (np. smartinbox.json).
// Ceny NIE są częścią stron opisowych.
const opisy = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/opisy' }),
  schema: z.object({ pl: strona, en: strona }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(20).max(70),
    description: z.string().min(80).max(160),
    lang: z.enum(['pl', 'en']).default('pl'),
    author: z.string().optional(), // domyślnie właściciel z firma.json
    alt: z.string().optional(), // nazwa pliku (bez .md) wersji w drugim języku
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).max(5).default([]),
    draft: z.boolean().default(true),
  }),
});

export const collections = { rozwiazania, blog, opisy };
