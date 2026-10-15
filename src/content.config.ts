import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const translations = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/translations' }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		date: z.coerce.date(),
		teacher: reference('teachers').optional(),
		translator: z.string().optional(),
		tradition: z.string().optional(),
		original_language: z.string().optional(),
		source: z.string().optional(),
		tags: z.array(z.string()).default([]),
		excerpt: z.string().optional(),
		cover: z.string().optional(),
		// 'book' shows the whole cover upright on a blurred backdrop instead of cropping it.
		cover_style: z.enum(['photo', 'book']).default('photo'),
		featured: z.boolean().default(false),
		// Large first letter on the text page; off for texts that open with a note or a verse.
		dropcap: z.boolean().default(true),
		draft: z.boolean().default(false),
	}),
});

const teachers = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/teachers' }),
	schema: z.object({
		name: z.string(),
		dates: z.string().optional(),
		tradition: z.string().optional(),
		region: z.string().optional(),
		summary: z.string().optional(),
		portrait: z.string().optional(),
	}),
});

const terms = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/terms' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = { translations, teachers, terms };
