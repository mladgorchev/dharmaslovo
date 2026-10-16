import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { articleUrl, excerptOf, getArticles, getTerms, getTranslations, settings, termUrl, translationUrl } from '../lib/utils';

export async function GET(context: APIContext) {
	const translations = await getTranslations();
	const terms = await getTerms();
	const articles = settings.show_articles ? await getArticles() : [];
	return rss({
		title: 'Дхарма Слово',
		description: 'Преводи на будистки текстове и учения на български език.',
		site: context.site!,
		items: [
			...translations.map((t) => ({
				title: t.data.title,
				pubDate: t.data.date,
				description: excerptOf(t, 300),
				link: translationUrl(t),
			})),
			...articles.map((a) => ({
				title: a.data.title,
				pubDate: a.data.date,
				description: excerptOf(a, 300),
				link: articleUrl(a),
			})),
			...terms.map((t) => ({
				title: `${t.data.title} (речник)`,
				pubDate: t.data.date,
				description: excerptOf(t, 300),
				link: termUrl(t),
			})),
		].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
		customData: '<language>bg</language>',
	});
}
