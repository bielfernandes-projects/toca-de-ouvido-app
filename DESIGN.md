---
name: Qual o Tom App
description: Explorador interativo de campo harmônico e dicionário de acordes para violão e cavaco.
colors:
  primary: "#f97316"
  primary-deep: "#c2410c"
  neutral-bg: "#09090b"
  neutral-bg-alt: "#f5f5f0"
  neutral-fg: "#fafafa"
  neutral-fg-alt: "#18181b"
  neutral-card: "#18181b"
  neutral-card-alt: "#ffffff"
  neutral-card-text: "#a1a1aa"
  neutral-card-text-alt: "#71717a"
  neutral-border: "#27272a"
  neutral-border-alt: "#e4e4e7"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-inactive-dark:
    backgroundColor: "#18181b"
    textColor: "#d4d4d8"
    rounded: "{rounded.lg}"
    height: "48px"
  button-inactive-light:
    backgroundColor: "#e4e4e7"
    textColor: "#52525b"
    rounded: "{rounded.lg}"
    height: "48px"
  card-dark:
    backgroundColor: "#18181b"
    rounded: "{rounded.xl}"
  card-light:
    backgroundColor: "#ffffff"
    rounded: "{rounded.xl}"
    borderColor: "#e4e4e7"
  toggle-thumb:
    width: "20px"
    height: "20px"
    backgroundColor: "#ffffff"
    rounded: "9999px"
  toggle-track-on:
    backgroundColor: "{colors.primary}"
    width: "44px"
    height: "24px"
    rounded: "9999px"
  toggle-track-off-dark:
    backgroundColor: "#3f3f46"
    width: "44px"
    height: "24px"
    rounded: "9999px"
  toggle-track-off-light:
    backgroundColor: "#d4d4d8"
    width: "44px"
    height: "24px"
    rounded: "9999px"
---

# Design System: Qual o Tom App

## 1. Overview

**Creative North Star: "O Mapa do Tom"**

O Qual o Tom App é uma ferramenta de consulta e aprendizado musical — um mapa do campo harmônico que o usuário explora para encontrar o tom certo, visualizar acordes no braço do instrumento e descobrir progressões. A atmosfera visual mescla dois mundos: a **noite de ensaio** (dark mode — acolhedor, sem distrações, como um estúdio à meia-luz) e a **sala de aula musical** (light mode — didático, limpo, como um quadro com giz).

O design segue o princípio "ferramenta, não brinquedo": cada elemento serve à tarefa. Não há decoração gratuita. A interface desaparece quando o usuário está imerso na descoberta musical.

**Key Characteristics:**
- Escuro acolhedor por padrão, claro didático como alternativa
- Um único acento (Laranja Queimado) aplicado com parcimônia — apenas para estado ativo e ação primária
- Superfícies planas com separação por bordas e tons, não por sombras profundas
- Tipografia limpa e geométrica (Geist), sem serifa display
- Diagramas de acordes inline em SVG, fiéis ao braço do instrumento

## 2. Colors

A paleta opera em dois regimes (dark/light) com o mesmo acento laranja. Os neutros escuros têm leve inclinação azulada (oklch hue ~280), enquanto o neutro claro do light mode é levemente aquecido (oklch hue ~90).

### Primary
- **Laranja Queimado** (#f97316 / oklch(0.7 0.18 45)): Acento único. Usado em: botão ativo (nota/acidental/modo selecionado), toggle ligado, dots dos diagramas de acorde, hover em links. Sua raridade é o ponto — nunca mais de ~10% da tela.
- **Laranja Queimado Profundo** (#c2410c / oklch(0.55 0.17 35)): Hover do botão primário e dots dos diagramas em dark mode.

### Neutral
- **Fundo Escuro** (#09090b / oklch(0.03 0.003 280)): Body background em dark mode.
- **Fundo Claro** (#f5f5f0 / oklch(0.97 0.008 90)): Body background em light mode. Off-white levemente aquecido (gelo/off-white).
- **Texto Claro** (#fafafa / oklch(0.98 0.002 280)): Corpo do texto em dark mode.
- **Texto Escuro** (#18181b / oklch(0.1 0.005 280)): Corpo do texto em light mode.
- **Card Dark** (#18181b / oklch(0.1 0.005 280)): Superfície de cartões, placeholders de anúncio em dark mode.
- **Card Light** (#ffffff): Superfície de cartões em light mode.
- **Card Text Dark** (#a1a1aa / oklch(0.68 0.01 280)): Texto secundário (labels, subtítulos) em dark mode.
- **Card Text Light** (#71717a / oklch(0.5 0.01 280)): Texto secundário em light mode.
- **Border Dark** (#27272a / oklch(0.18 0.01 280)): Bordas de separação em dark mode.
- **Border Light** (#e4e4e7 / oklch(0.9 0.01 280)): Bordas de separação em light mode.

### Named Rules
**The Single Accent Rule.** O Laranja Queimado é o único acento. Não há cor secundária. Ele aparece exclusivamente em: elementos ativos/selecionados, toggle ligado, dots de diagrama, hover de link. Nunca como decoração.

**The Two-Regime Rule.** Toda cor neutra tem um par dark/light. O tema é controlado pelo usuário via toggle; não há modo automático. O parâmetro `light` é passado como prop aos componentes que precisam dele.

## 3. Typography

**Display/Body Font:** Geist (system-ui, sans-serif)
**Mono Font:** Geist Mono (monospace, via CSS variable)

**Character:** Geist é uma geométrica sem serifa desenhada pela Vercel — limpa, legível, sem personalidade excessiva. A fonte desaparece no conteúdo. Não há pairing display/body: uma família faz tudo.

### Hierarchy
- **Display** (Bold 700, 1.875rem / 30px, line-height 1.2): Título principal da página (h1). Usado apenas no header "Qual o Tom App".
- **Title** (Semibold 600, 1.125rem / 18px, line-height 1.3): Nomes das progressões (h3) e seções (h2).
- **Body** (Regular 400, 1rem / 16px, line-height 1.5): Nomes dos acordes no campo harmônico, botões, texto geral.
- **Label** (Regular 400, 0.875rem / 14px, line-height 1.4): Labels de instrumento, labels de seleção, textos auxiliares.
- **Small** (Regular 400, 0.75rem / 12px, line-height 1.4): Numeração romana dos graus, texto do footer, textos de anúncio, "Diagrama não mapeado".

### Named Rules
**The One-Family Rule.** Nunca usar uma segunda fonte display. Geist serve para tudo — títulos, botões, labels, corpo. A hierarquia é feita por peso e tamanho, não por troca de família.

## 4. Elevation

O sistema é **plano por padrão**. A profundidade é comunicada por variação tonal (neutro escuro vs. médio para superfície vs. fundo) e por bordas (1px), não por sombras. No light mode, cartões recebem `shadow-sm` do Tailwind (box-shadow difuso de 1-2px) para separar superfícies brancas do fundo off-white.

A única exceção é o hover dos botões: um `transition-colors duration-150` suave, sem translateY ou elevação falsa.

### Named Rules
**The Flat-by-Default Rule.** Superfícies são planas em repouso. Nenhuma sombra em dark mode. No light mode, sombras são sutis (shadow-sm) e apenas em cartões. Jamais usar sombras em botões ou elementos interativos.

## 5. Components

### Buttons (Note / Accidental / Mode / Instrument selection)
- **Shape:** Cantos arredondados de 12px (rounded-lg). Altura fixa de 48px (h-12).
- **Primary (active/selected):** Fundo Laranja Queimado (#f97316), texto branco. Hover: Laranja Queimado Profundo (#c2410c).
- **Inactive (dark):** Fundo card dark (#18181b), texto zinc-300 (#d4d4d8). Hover: fundo zinc-700 (#3f3f46).
- **Inactive (light):** Fundo zinc-200 (#e4e4e7), texto zinc-600 (#52525b). Hover: fundo zinc-300 (#d4d4d8).
- **Transição:** 150ms, colors.

### Toggle Switch (Show Diagrams)
- **Shape:** Pilula de 44×24px (rounded-full).
- **Track ON:** Fundo Laranja Queimado (#f97316).
- **Track OFF (dark):** Fundo zinc-700 (#3f3f46).
- **Track OFF (light):** Fundo zinc-300 (#d4d4d8).
- **Thumb:** Círculo branco de 20×20px, desliza horizontalmente com `translate-x-5` quando ativo.
- **Label:** Label size, card-text color.

### Theme Toggle
- **Shape:** Botão sem fundo, posicionado absolute no canto superior direito do header.
- **Ícone:** ☀️ (dark → light) / 🌙 (light → dark). Tamanho text-lg.
- **Hover:** Laranja Queimado (#f97316). Transição 150ms.
- **Aria-label:** "Ativar modo claro" / "Ativar modo escuro".

### Cards (Progression)
- **Shape:** Cantos de 16px (rounded-xl). Padding de 20px (p-5).
- **Dark:** Fundo card dark (#18181b), sem borda.
- **Light:** Fundo branco (#ffffff), borda 1px zinc-200 (#e4e4e7), sombra shadow-sm.
- **Header:** Title weight (semibold) no nome da progressão.
- **Numerals:** Small size, card-text color.
- **Chords:** Body size, bold, foreground color.

### Harmonic Field Section
- **Shape:** Cantos de 12px (rounded-xl). Padding de 24px (p-6).
- **Dark:** Fundo zinc-900/50 (#18181b com 50% opacidade), borda 1px zinc-800 (#27272a).
- **Light:** Fundo branco (#ffffff), borda 1px zinc-200 (#e4e4e7), sombra shadow-sm.
- **Numerals (Roman):** Small size, zinc-400, medium weight, espaçados com gap-x-4.
- **Chords:** XL size (1.25rem), bold, foreground color.

### Chord Diagram (SVG)
- **Shape:** Inline SVG 100×120px, viewBox "0 0 100 120". Cantos de 2px no retângulo de fundo.
- **Dark:** bg #27272a, nut #a1a1aa, frets #3f3f46, strings #52525b, dots Laranja Queimado (#f97316), labels #a1a1aa.
- **Light:** bg #e4e4e7, nut #52525b, frets #a1a1aa, strings #d4d4d8, dots Laranja Queimado Profundo (#c2410c), labels #52525b.
- **Fallback (sem forma mapeada):** Card de 96×128px com mensagem "Diagrama não mapeado" e o nome do acorde em bold.
- **Acessibilidade:** `role="img"` com `aria-label` descrevendo o acorde e instrumento.

### Ad Placeholder
- **Shape:** Cantos de 8px (rounded-lg). Altura mínima de 90px (mobile) ou 600px (desktop sidebar).
- **Fundo:** card-bg (escuro ou claro conforme tema).
- **Texto:** card-text, small size.
- **Conteúdo:** "Espaço para Anúncio (AdSense)" — placeholder até o AdSense ser aprovado.

### Footer
- **Texto:** card-text, 0.75rem, centralizado.
- **Borda superior:** 1px solid border-color.
- **Padding:** 32px top/bottom (py-8).
- **Link de privacidade:** Card-text com hover Laranja Queimado.

## 6. Do's and Don'ts

### Do:
- **Do** usar Laranja Queimado com parcimônia — apenas para estado ativo e ações primárias.
- **Do** manter o fundo escuro por padrão (dark mode é o regime principal do "noite de ensaio").
- **Do** usar Geist em toda a interface — uma família, sem pairing.
- **Do** preferir separação por borda fina (1px) e tom sobre sombra.
- **Do** colocar aria-label em todo diagrama de acorde e botão de toggle.
- **Do** usar `text-wrap: balance` em títulos (h1-h3) para linhas equilibradas.

### Don't:
- **Don't** adicionar uma segunda cor de acento. Laranja Queimado é o único.
- **Don't** usar gradientes, glassmorphism, sombras profundas, ou qualquer decoração que não sirva à tarefa.
- **Don't** animar entrada de página ou progressões orquestradas. O app carrega numa tarefa.
- **Don't** usar sombras em elementos interativos (botões, toggles) — apenas cartões no light mode.
- **Don't** usar fonte display decorativa ou serifada para títulos. Geist é a única.
- **Don't** ultrapassar 75ch de largura de linha no texto corrido (footer, privacy policy).
- **Don't** usar cards aninhados. Um card por progressão, sem sub-cards.
