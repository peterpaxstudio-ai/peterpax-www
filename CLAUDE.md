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
- `cenaOd` to liczba całkowita bez waluty. Wartość podaje człowiek, nie zgaduj jej.
- `opisUrl`: link do opisu rozwiązania na zewnętrznej stronie. Pusty = na karcie "Opis wkrótce".
- Nie opisuj narzędzi technicznych (n8n, Make, API). Opisuj problem i efekt dla klienta.
- Teksty krótkie: problem, jak, efekt maks. 2 zdania.

## Blog (`src/content/blog/`)
- Pole `lang`: `pl` albo `en`. Wersja EN to osobny plik, zwykle z końcówką `-en` w nazwie.
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
