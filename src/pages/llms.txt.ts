import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import firma from '../data/firma.json';
import { paths, solutionBase } from '../i18n/ui';

// /llms.txt: zwięzły opis witryny dla modeli językowych i botów AI (https://llmstxt.org).
// Generowany przy każdym buildzie z kolekcji, więc nowe wpisy i strony pojawiają się same.
// Nie zawiera cen. Wpisy z pubDate w przyszłości są pomijane.
export const GET: APIRoute = async ({ site }) => {
  const base = site!.origin;
  const abs = (path: string) => new URL(path, site).href;
  const now = new Date();
  const day = (d: Date) => d.toISOString().slice(0, 10);

  const cards = (await getCollection('rozwiazania'))
    .filter((s) => !s.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
  const opisy = new Map((await getCollection('opisy')).map((o) => [o.id, o.data]));
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft && p.data.pubDate <= now)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const solutions = (lang: 'pl' | 'en') =>
    cards
      .filter((s) => opisy.has(s.id))
      .map((s) => `- [${s.data.nazwa}](${abs(`${solutionBase[lang]}${s.id}/`)}): ${opisy.get(s.id)![lang].description}`);
  const blog = (lang: 'pl' | 'en') =>
    posts
      .filter((p) => p.data.lang === lang)
      .map((p) => `- [${p.data.title}](${abs(`${paths[lang].blog}${p.id}/`)}): ${p.data.description} (${day(p.data.pubDate)})`);

  const lines = [
    `# ${firma.marka}`,
    '',
    `> ${firma.marka} (${firma.nazwa}, ${firma.formaPrawna}, ${firma.adres.split(',')[1]?.trim() ?? 'Polska'}) tworzy gotowe automatyzacje dla małych firm w serii Smart, na przykład SmartInbox, SmartCal, SmartReview i SmartStock. Strona jest po polsku i po angielsku. / ${firma.marka} builds ready-made automation solutions for small businesses in the Smart series. The site is in Polish and English.`,
    '',
    'Ceny ustalane są indywidualnie po rozmowie, dlatego strona ich nie podaje. / Pricing is quoted individually after a call, so the site lists no prices.',
    '',
    '## Firma / Company',
    '',
    `- Właściciel i autor treści / Owner and author: ${firma.wlasciciel}`,
    `- Adres / Address: ${firma.adres}, Polska`,
    `- NIP: ${firma.nip}`,
    `- E-mail: ${firma.email}`,
    `- Telefon / Phone: ${firma.telefon}`,
    ...(firma.rezerwacjaUrl ? [`- Umów rozmowę / Book a call: ${firma.rezerwacjaUrl}`] : []),
    `- [O firmie](${abs(paths.pl.about)}) | [About](${abs(paths.en.about)})`,
    `- [Kontakt](${abs(paths.pl.contact)}) | [Contact](${abs(paths.en.contact)})`,
    '',
    '## Rozwiązania Smart (PL)',
    '',
    ...solutions('pl'),
    '',
    '## Smart solutions (EN)',
    '',
    ...solutions('en'),
    '',
    '## Blog (PL)',
    '',
    ...(blog('pl').length ? blog('pl') : ['- Wkrótce.']),
    '',
    '## Blog (EN)',
    '',
    ...(blog('en').length ? blog('en') : ['- Coming soon.']),
    '',
    '## Profile / Profiles',
    '',
    `- LinkedIn (firma / company): ${firma.linkedinFirma}`,
    `- Facebook: ${firma.facebook}`,
    `- LinkedIn (${firma.wlasciciel}): ${firma.linkedin}`,
    '',
    '## Optional',
    '',
    `- [Strona główna (PL)](${abs(paths.pl.home)})`,
    `- [Home page (EN)](${abs(paths.en.home)})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
