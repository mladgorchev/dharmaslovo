// Streamlined Bulgarian transliteration, so tag URLs stay readable when shared.
const translit: Record<string, string> = {
	а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
	к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
	ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht', ъ: 'a', ь: 'y', ю: 'yu', я: 'ya',
};

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.split('')
		.map((ch) => translit[ch] ?? ch)
		.join('')
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

// A file's web address: the file name (or a `slug` field) turned into Latin letters,
// so a Cyrillic file name such as "абидхарма.md" is served at /rechnik/abidharma/.
export function idFromFile(entry: string, data: Record<string, unknown>): string {
	const name = typeof data.slug === 'string' && data.slug ? data.slug : entry.replace(/\.md$/, '');
	return slugify(name);
}
