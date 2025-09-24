# zadanie_empik

Automatyczne testy napisane w Playwright + TypeScript w celach rekrutacji do Empik.

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/GA3RlEL/zadanie_empik/ci.yml?branch=main)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-green)
![Playwright](https://img.shields.io/badge/tested%20with-Playwright-blue)

## Wymagania

- Node.js >= 18
- npm

## Instalacja

```bash
npm install
```

- Instalacja przeglądarek

```bash
npx playwright install
```

## Uruchamianie testów

- Wszystkie testy:
  ```bash
  npm test
  ```
- Tylko desktop:
  ```bash
  npm run test:desktop
  ```
- Tylko mobile:
  ```bash
  npm run test:mobile
  ```
- Uruchomienie bez trybu headless
  ```bash
  npm run test:headed
  ```

## Struktura projektu

- `tests/` – pliki testowe Playwright
- `page_objects/` – Page Object Pattern dla stron Empik
- `types/` – typy TypeScript
- `constants/` – konfiguracje i stałe (np. baseURL)
- `.github/workflows/ci.yml` – CI dla GitHub Actions

## Skrypty

Zobacz sekcję `scripts` w `package.json`.

## CI

Testy uruchamiane są automatycznie na GitHub Actions po każdym push/pull request do `main`.

## Dodatkowe

- Retry testów: domyślnie 2 próby
- Raporty: HTML
- Obsługa desktop i mobile
