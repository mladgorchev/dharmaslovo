import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { idFromFile } from './lib/slug';

const generateId = ({ entry, data }: { entry: string; data: Record<string, unknown> }) =>
	idFromFile(entry, data);

// Accepts "gampopa", "gampopa.md" or "src/content/teachers/gampopa.md", since the
// online editor (Pages CMS) may store a reference as a file path.
const toId = (v: unknown) => (typeof v === 'string' ? idFromFile(v.replace(/^.*\//, ''), {}) : v);

const translations = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/translations', generateId }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		date: z.coerce.date(),
		teacher: z.preprocess(toId, reference('teachers')).optional(),
		translator: z.string().optional(),
		tradition: z.string().optional(),
		original_language: z.string().optional(),
		source: z.string().optional(),
		tags: z.array(z.string()).default([]),
		excerpt: z.string().optional(),
		cover: z.string().optional(),
		// 'book' shows the whole cover upright on a blurred backdrop instead of cropping it;
		// 'framed' shows the whole image on a plain background (for paintings).
		cover_style: z.enum(['photo', 'book', 'framed']).default('photo'),
		// Credit line for the cover image, shown under it on the text's page.
		cover_credit: z.string().optional(),
		cover_credit_url: z.string().optional(),
		featured: z.boolean().default(false),
		// Large first letter on the text page; off for texts that open with a note or a verse.
		dropcap: z.boolean().default(true),
		draft: z.boolean().default(false),
	}),
});

const teachers = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/teachers', generateId }),
	schema: z.object({
		name: z.string(),
		dates: z.string().optional(),
		tradition: z.string().optional(),
		region: z.string().optional(),
		summary: z.string().optional(),
		portrait: z.string().optional(),
		portrait_credit: z.string().optional(),
		portrait_credit_url: z.string().optional(),
	}),
});

const terms = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/terms', generateId }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

const authors = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/authors', generateId }),
	schema: z.object({
		name: z.string(),
		// e.g. "Преводач и практикуващ" or "Докторант, Софийски университет"
		role: z.string().optional(),
		summary: z.string().optional(),
		portrait: z.string().optional(),
		website: z.string().optional(),
	}),
});

export const articleKinds = {
	izsledvane: 'Изследване',
	praktika: 'Практика и опит',
	belezhki: 'Бележки',
} as const;

const articles = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/articles', generateId }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		date: z.coerce.date(),
		author: z.preprocess(toId, reference('authors')).optional(),
		kind: z.enum(['izsledvane', 'praktika', 'belezhki']).default('praktika'),
		// Translations this article discusses; each one links back to the article.
		related: z.array(z.preprocess(toId, reference('translations'))).default([]),
		tags: z.array(z.string()).default([]),
		excerpt: z.string().optional(),
		cover: z.string().optional(),
		cover_style: z.enum(['photo', 'book', 'framed']).default('photo'),
		cover_credit: z.string().optional(),
		cover_credit_url: z.string().optional(),
		dropcap: z.boolean().default(true),
		draft: z.boolean().default(false),
	}),
});

export const collections = { translations, teachers, terms, authors, articles };
