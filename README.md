# Qual o Tom App

App utilitário para músicos — calcula o campo harmônico de qualquer tom e exibe progressões de acordes com diagramas para Violão e Cavaco.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Geist** (fonte)

## Como Rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Funcionalidades

- Seletor de tom (7 notas × 2 acidentes × 2 modos)
- Seletor de instrumento (Violão / Cavaco)
- Campo harmônico com 7 graus e acordes reativos
- Diagramas SVG profissionais para cada acorde
- Toggle para exibir/ocultar diagramas
- Progressões de acordes por gênero musical brasileiro (Samba, Sertanejo, Sofrência, Brega, Rock, Reggae)
- Layout responsivo mobile-first com dark mode
- Anúncios laterais (desktop) e banners (mobile)

## Estrutura

```
src/
  app/              — páginas, layout, manifest PWA
  components/       — ChordDiagram (SVG)
  lib/              — lógica de domínio (mockData, musicEngine, chordDb)
  public/           — favicons, logo
docs/               — documentação e changelog
```

## Licença

Projeto privado.
