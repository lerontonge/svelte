import { modules } from '$lib/generated/type-info.js';
import {
	extract_frontmatter,
	normalizeSlugify,
	removeMarkdown,
	transform
} from '$lib/server/markdown/index.js';
import { replace_export_type_placeholders } from '$lib/server/markdown/renderer.js';
import fs from 'node:fs';
import path from 'node:path';
import glob from 'tiny-glob/sync.js';
import { CONTENT_BASE } from '../../constants.js';

const base = CONTENT_BASE;

/** @param {string[]} parts */
function get_href(parts) {
	return parts.length > 1 ? `/docs/${parts[0]}#${parts.at(-1)}` : `/docs/${parts[0]}`;
}

export function content() {
	/** @type {import('@sveltejs/site-kit/search').Block[]} */
	const blocks = [];

	const breadcrumbs = [];

	for (const file of glob('**/*.md', { cwd: `${base}/docs` })) {
		const basename = path.basename(file);
		const match = /\d{2}-(.+)\.md/.exec(basename);
		if (!match) continue;

		const slug = match[1];

		const filepath = `${base}/docs/${file}`;
		// const markdown = replace_placeholders(fs.readFileSync(filepath, 'utf-8'));
		const markdown = replace_export_type_placeholders(fs.readFileSync(filepath, 'utf-8'), modules);

		const { body, metadata } = extract_frontmatter(markdown);

		const sections = body.trim().split(/^## /m);
		const intro = sections.shift().trim();
		const rank = +metadata.rank || undefined;

		blocks.push({
			breadcrumbs: [...breadcrumbs, removeMarkdown(remove_TYPE(metadata.title) ?? '')],
			href: get_href([slug]),
			content: plaintext(intro),
			rank
		});

		for (const section of sections) {
			const lines = section.split('\n');
			const h2 = lines.shift();
			const content = lines.join('\n');

			const subsections = content.trim().split('## ');

			const intro = subsections.shift().trim();

			blocks.push({
				breadcrumbs: [
					...breadcrumbs,
					removeMarkdown(remove_TYPE(metadata.title)),
					remove_TYPE(removeMarkdown(h2))
				],
				href: get_href([slug, normalizeSlugify(h2)]),
				content: plaintext(intro),
				rank
			});

			for (const subsection of subsections) {
				const lines = subsection.split('\n');
				const h3 = lines.shift();

				blocks.push({
					breadcrumbs: [
						...breadcrumbs,
						removeMarkdown(remove_TYPE(metadata.title)),
						removeMarkdown(remove_TYPE(h2)),
						removeMarkdown(remove_TYPE(h3))
					],
					href: get_href([slug, normalizeSlugify(h2), normalizeSlugify(h3)]),
					content: plaintext(lines.join('\n').trim()),
					rank
				});
			}
		}
	}

	return blocks;
}

/** @param {string} str */
function remove_TYPE(str) {
	return str?.replace(/^\[TYPE\]:\s+(.+)/, '$1') ?? '';
}

/** @param {string} markdown */
function plaintext(markdown) {
	/** @param {unknown} text */
	const block = (text) => `${text}\n`;

	/** @param {string} text */
	const inline = (text) => text;

	return transform(markdown, {
		code: (source) => source.split('// ---cut---\n').pop(),
		blockquote: block,
		html: () => '\n',
		heading: (text) => `${text}\n`,
		hr: () => '',
		list: block,
		listitem: block,
		checkbox: block,
		paragraph: (text) => `${text}\n\n`,
		table: block,
		tablerow: block,
		tablecell: (text, opts) => {
			return text + ' ';
		},
		strong: inline,
		em: inline,
		codespan: inline,
		br: () => '',
		del: inline,
		link: (href, title, text) => text,
		image: (href, title, text) => text,
		text: inline
	})
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&#(\d+);/g, (match, code) => {
			return String.fromCharCode(code);
		})
		.trim();
}
