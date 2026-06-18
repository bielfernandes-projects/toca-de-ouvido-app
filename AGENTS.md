<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Session: 2026-06-18 — Theme globalizado + SupportModal + Correções

### O que foi feito

**Tema migrado para next-themes** (antes: ThemeContext próprio com CSS variables inline)
- `src/app/providers.tsx` — novo ThemeProvider com `attribute="class" defaultTheme="dark"`
- `src/app/globals.css` — CSS variables movidas de `:root` para `.light`/`.dark`; adicionado `@variant dark (&:is(.dark *))` para Tailwind v4 reagir à classe CSS
- `src/app/layout.tsx` — Providers + `suppressHydrationWarning` no `<html>`
- `src/components/ThemeToggle.tsx` — `useTheme` de `next-themes`; padrão mounted para evitar erro de hidratação
- `src/app/HomeClient.tsx` — ternários substituídos por classes `dark:`; estado mounted para ChordDiagram
- `src/app/politica-de-privacidade/page.tsx` — classes hardcoded substituídas por `dark:`
- Deletado: `src/context/ThemeContext.tsx`

**SupportModal** (componente de suporte)
- `src/components/SupportModal.tsx` — modal com email e PIX; focus trap + ARIA + fade-in

**Outras correções**
- Contraste do botão PIX: `bg-orange-500` → `bg-orange-600`
- `AdUnit.tsx`, `ErrorBoundary.tsx` — componentes auxiliares
- `src/lib/chordDb.ts` — shapes C#7/D#7 (violão) + C7-C#7-D7-D#7 (cavaco)
- `src/components/ChordDiagram.tsx` — label y ajustado, dot radius 5.5→4.5
