import { getCollection, type CollectionEntry } from 'astro:content';
import siteSettings from '../data/settings.json';

export type Translation = CollectionEntry<'translations'>;
export type Term = CollectionEntry<'terms'>;
export type Article = CollectionEntry<'articles'>;
export type Author = CollectionEntry<'authors'>;

// Site-wide switches, editable in the online editor under "Настройки".
export const settings: { show_articles: boolean } = siteSettings;

export const articleKindLabels: Record<Article['data']['kind'], string> = {
	izsledvane: 'Изследване',
	praktika: 'Практика и опит',
	belezhki: 'Бележки',
};

export async function getTranslations(): Promise<Translation[]> {
	const all = await getCollection('translations', ({ data }) => !data.draft);
	return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Glossary terms in Bulgarian alphabetical order.
export async function getTerms(): Promise<Term[]> {
	const all = await getCollection('terms', ({ data }) => !data.draft);
	return all.sort((a, b) => a.data.title.localeCompare(b.data.title, 'bg'));
}

// Published articles, newest first.
export async function getArticles(): Promise<Article[]> {
	const all = await getCollection('articles', ({ data }) => !data.draft);
	return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const translationUrl = (entry: Translation) => `/prevodi/${entry.id}/`;
export const articleUrl = (entry: Article) => `/statii/${entry.id}/`;
export const authorUrl = (id: string) => `/avtori/${id}/`;
export const termUrl = (entry: Term) => `/rechnik/${entry.id}/`;

const dateFormat = new Intl.DateTimeFormat('bg-BG', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
});

export function formatDate(date: Date): string {
	return dateFormat.format(date);
}

export function readingTime(body = ''): number {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export { slugify } from './slug';

export function excerptOf(entry: Translation | Term | Article, length = 180): string {
	if ('excerpt' in entry.data && entry.data.excerpt) return entry.data.excerpt;
	const plain = (entry.body ?? '')
		.replace(/^\[\^[^\]]+\]:.*$/gm, '')
		.replace(/\[\^[^\]]+\]/g, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\\$/gm, '')
		.replace(/^#+\s.*$/gm, '')
		.replace(/^-{3,}$/gm, '')
		.replace(/[*_>`#\[\]()]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
	return plain.length > length ? plain.slice(0, length).replace(/\s+\S*$/, '') + '…' : plain;
}
