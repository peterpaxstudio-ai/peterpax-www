# Zasady pracy nad treścią strony peterpax.ai500.pl

Strona firmy Peter Pax: wystawa automatyzacji z serii Smart (PL + EN), blog, O firmie, Kontakt.
Zbudowana w Astro. Treści edytujesz Ty (agent), człowiek zatwierdza Pull Request.

## Zakres
- Edytujesz TYLKO pliki w `src/content/`.
- NIE zmieniasz: `src/data/firma.json`, `src/components/`, `src/layouts/`, `src/i18n/`,
  `src/styles/`, `src/pages/`, `.github/`, plików konfiguracyjnych, `public/`.
- Ceny, dane kontaktowe, NIP i treści prawne bierz wyłącznie z `src/data/firma.json`.
  Jeśli brakuje danych, napisz to w opisie PR.
- Teksty interfejsu (menu, przyciski, nagłówki sekcji) są w `src/i18n/ui.ts`. Ich zmianę zgłoś w PR jako prośbę, nie edytuj.

## Kolekcja `rozwiazania` (seria Smart)
- Jeden plik `.md` = jedno rozwiązanie, nazwa pliku małymi literami (`smartinbox.md`).
- Wszystkie pola tekstowe mają wersję `pl` i `en`. Zawsze uzupełniaj obie.
- `nazwa` zaczyna się od `Smart` (np. `SmartInbox`). `kolor`: sun, sage, sky lub rose. `litera`: jedna wielka litera.
- Karty nie pokazują cen i schemat nie ma pola z ceną. Nie dodawaj cen do kart ani wpisów, chyba że zadanie mówi inaczej (ceny podaje człowiek, nie zgaduj ich).
- `opisUrl`: link do opisu rozwiązania na zewnętrznej stronie. Pusty = na karcie "Opis wkrótce".
- Nie opisuj narzędzi technicznych (n8n, Make, API). Opisuj problem i efekt dla klienta.
- Teksty krótkie: problem, jak, efekt maks. 2 zdania.

## Strony opisowe rozwiązań (`src/content/opisy/`)
- Jeden plik `.json` = jedna strona opisowa, nazwa pliku taka sama jak plik karty w `rozwiazania` (np. `smartinbox.json` dla `smartinbox.md`). Plik ma klucze `pl` i `en`, obie wersje zawsze uzupełniaj.
- Struktura jest stała (wspólny design): `title` (20-70 znaków), `description` (80-160), `eyebrow`, `heroTitle`, `lead`, `facts`, `problem`, `solution`, `steps`, `benefits`, opcjonalnie `extras` i `start`, `faq`, `cta`. Sekcje to `{ title, lead?, items: [{ t, d? }] }`.
- Treść bierz z opisu rozwiązania (strony na peterpax.pl lub materiałów od Piotra), nie wymyślaj. Bez cen, kwot, nazw narzędzi technicznych (n8n, GPT) i opinii klientów.
- Karta w `rozwiazania` automatycznie prowadzi do strony opisowej, gdy istnieje plik o tej samej nazwie. Strony: `/rozwiazania/<nazwa>/` (PL) i `/en/solutions/<nazwa>/` (EN).

## llms.txt
- `/llms.txt` generuje się automatycznie przy buildzie (`src/pages/llms.txt.ts`) z kart, stron opisowych i opublikowanych wpisów. Nie edytuj go ręcznie i nie dodawaj do niego cen.

## Blog (`src/content/blog/`)
- Pole `lang`: `pl` albo `en`. Wersja EN to osobny plik, zwykle z końcówką `-en` w nazwie.
- Pole `alt`: nazwa pliku (bez `.md`) wersji w drugim języku, ustawiaj w obu plikach pary. Dzięki niemu działają tagi hreflang i przełącznik języka.
- Pole `author` jest opcjonalne (domyślnie Piotr Gancarz z `firma.json`). `updatedDate` ustawiaj przy każdej istotnej zmianie treści.
- Strona sama dodaje datę, autora, czas czytania, ramkę o autorze, linki do innych wpisów oraz dane strukturalne (BlogPosting, BreadcrumbList, FAQPage).
- Format przyjazny AEO/GEO: pierwszy akapit to bezpośrednia odpowiedź na pytanie z tytułu (2-3 zdania), nagłówki H2 najlepiej jako pytania lub konkretne tezy, fakty ze źródłem i datą w treści, na końcu sekcja FAQ.
- Sekcja FAQ musi mieć nagłówek `## Najczęstsze pytania` (PL) lub `## Frequently asked questions` (EN), a każde pytanie to osobna linia w pogrubieniu, odpowiedź w następnej linii. Tylko wtedy trafia do danych strukturalnych FAQPage.
- title 20-70 znaków, description 80-160 znaków.
- Nowe wpisy zawsze z `draft: true`, chyba że zadanie mówi inaczej.

## Styl
- Odbiorca: właściciel małej firmy, bez wiedzy technicznej. Pisz prosto, bez żargonu.
- Język PL: rzeczowy, ciepły, per Ty. Język EN: ten sam ton, proste zdania.
- Akapity maks. 4 zdania, śródtytuły H2/H3, bez H1 w treści wpisu (H1 = title).
- Bez myślników długich (—) w tekstach. Użyj przecinka lub nowego zdania.

## SEO / GEO
- Na początku wpisu bezpośrednia odpowiedź na pytanie z tytułu (2-3 zdania).
- Sekcja FAQ na końcu, jeśli temat na to pozwala.
- Linkuj wewnętrznie do 2-3 powiązanych podstron (np. do rozwiązań Smart).

## Fakty
- Nie wymyślaj statystyk, cytatów, opinii klientów, nazw firm ani wyników wdrożeń.
- Jeśli nie masz źródła, pomiń twierdzenie albo oznacz: `<!-- DO WERYFIKACJI -->`.

## Proces
- Przed zakończeniem uruchom `npm run build` i napraw błędy.
- Opis PR: co zmieniono, co wymaga weryfikacji człowieka.
