# Дхарма Слово

The new dharmaslovo.org: a static site built with [Astro](https://astro.build), with search by [Pagefind](https://pagefind.app). It replaces the WordPress site.

## Content

- `src/content/translations/`: translations, served at `/prevodi/<file name>/`
- `src/content/terms/`: glossary terms, served at `/rechnik/<file name>/`
- `src/content/teachers/`: teachers and authors, served at `/uchiteli/<file name>/`
- `public/images/`: images
- `public/files/`: downloads such as PDF books

Old WordPress addresses, including the old `wp-content/uploads` file links, redirect to the new ones through `vercel.json`.

## Editing online

The site can be edited in the browser with [Pages CMS](https://app.pagescms.org): log in with GitHub and open this repository. Its settings are in `.pages.yml`. Every save is a commit to `main`, and Vercel publishes it within a couple of minutes.

New texts start as drafts (`draft: true`): they are saved in the repository but not shown on the site until the draft switch is turned off. The repository is public, so drafts can still be read on GitHub.

## Adding a translation

Create a Markdown file in `src/content/translations/`. The file name becomes the address: `metta-sutta.md` is served at `/prevodi/metta-sutta/`.

```markdown
---
title: Метта сутта
subtitle: Беседа за любящата доброта      # optional
date: 2026-09-20
teacher: buda-shakyamuni                  # a file name from src/content/teachers/, optional
translator: Име Фамилия                   # optional
tradition: Тхеравада                      # Тхеравада, Махаяна, Ваджраяна, Дзен, ...
original_language: Пали                   # optional
source: https://suttacentral.net/snp1.8   # optional
tags: [сутри, медитация]
cover: /images/metta.jpg                  # optional, a file in public/images/
featured: true                            # show on the home page, optional
draft: true                               # hide until ready, optional
dropcap: false                            # no large first letter, optional
---

Текстът на превода…
```

## Adding a glossary term

Create a Markdown file in `src/content/terms/`:

```markdown
---
title: Бодхичита
date: 2025-03-01
tags: [бодхичита]    # optional
---

Скрт: бодхичита; Тиб. …, Уайли: byang chub kyi sems
```

Teachers live in `src/content/teachers/`, one file each, with an optional short biography.

## Running locally

```sh
npm install
npm run dev      # http://localhost:4321 (search only works after a build)
npm run build    # builds into dist/ and creates the search index
npm run preview
```

## Deploying on Vercel

1. In Vercel, choose **Add New → Project** and import this GitHub repository.
2. Leave the settings as they are. Vercel detects Astro and uses `npm run build`, output `dist`.
3. Every push then gets a preview link, and the `main` branch goes live.
4. When ready, add `dharmaslovo.org` under **Settings → Domains** and update the DNS records as Vercel shows. HTTPS certificates are issued and renewed automatically.
