# Arquitetura — Qual o Tom App

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 |
| Fonte | Geist (Vercel) |
| Icones | favicon.ico + PNG multi-size + apple-touch-icon |

## Estrutura de Pastas

```
src/
  app/
    globals.css        — estilos globais, dark mode (zinc-950)
    layout.tsx         — root layout, metadata (SEO, favicons, viewport), font
    page.tsx           — página principal (Client Component)
    manifest.ts        — PWA manifest (android-chrome icons)
  components/
    ChordDiagram.tsx   — SVG de diagrama de acordes (violão / cavaco)
  lib/
    mockData.ts        — dados estáticos (notas, acidentes, modos, progressões brasileiras)
    musicEngine.ts     — motor de teoria musical (puro TS, sem React)
    chordDb.ts         — banco de acordes flat (CSV strings) para 12 tonalidades
public/
  favicon.ico          — favicon principal
  favicon-16x16.png    — 16×16
  favicon-32x32.png    — 32×32
  icon.png             — ícone genérico 192×192
  apple-touch-icon.png — Apple touch icon 180×180
  android-chrome-192x192.png
  android-chrome-512x512.png
  logo.png             — logo do app no header
docs/
  ARCHITECTURE.md      — este arquivo
  CHANGELOG.md         — histórico de alterações
```

## Fluxo de Dados

```
Usuário seleciona Instrumento │
        ▼
useState atualiza instrument ('guitar' | 'cavaco')

Usuário clica em Nota / Acidente / Modo
        │
        ▼
useState atualiza selectedNote / selectedAccidental / selectedMode
        │
        ▼
getHarmonicField(note, accidental, mode)
  → calcula escala + acordes do campo harmônico
  → retorna { noteName, numerals[], chords[] }
        │
        ▼
getProgressionChords(field, numerals[])
  → mapeia cada numeral romano ao chord correspondente
  → retorna string[] com os acordes da progressão
        │
        ▼ (se showDiagrams=true)
<ChordDiagram instrument chordName={chord} />
  → getChordShape(instrument, chordName) internamente
  → retorna string (CSV: "x,3,2,0,1,0") ou null
  → renderiza SVG diagrama ou fallback "Diagrama não mapeado"
        │
        ▼ (se showDiagrams=false)
  → exibe apenas o nome do acorde em texto
```

## Motor Musical (`musicEngine.ts`)

Arquivo puramente funcional, sem dependências. Duas funções exportadas:

### `getHarmonicField(note, accidental, mode)`

1. Monta o nome da fundamental (ex: `C` + `#` → `C#`)
2. Mapeia para índice cromático (0–11)
3. Aplica intervalos da escala Maior `[0,2,4,5,7,9,11]` ou Menor `[0,2,3,5,7,8,10]`
4. Escolhe array cromático (sustenidos ou bemóis) conforme o acidente
5. Aplica sufixos de qualidade (`''`, `m`, `dim`) por grau
6. Retorna `{ noteName, numerals[], chords[] }`

### `getProgressionChords(field, numerals[])`

1. Para cada numeral (ex: `'IIm7'`), extrai o romano base (`II`) e o sufixo (`m7`)
2. Mapeia o romano para índice do campo harmônico
3. Extrai a root do chord naquele índice
4. Concatena root + sufixo (ex: `D` + `m7` → `Dm7`)
5. Retorna `string[]`

### Progressões por Gênero (`mockData.ts`)

| Gênero | Graus |
|---|---|
| Samba/Pagode (Quadradinho) | I → VI7 → IIm7 → V7 |
| Pop / Sertanejo Universitário | I → V → VIm → IV |
| Sofrência / Piseiro / Forró Moderno | VIm → IV → I → V |
| Brega Clássico / Jovem Guarda | I → VIm → IV → V |
| Brega Romântico / Arrocha | I → IIIm → IV → V |
| Rock | I → IV → V → IV |
| Reggae / Forró Xote Raiz | I → IV → I → IV |

### Edge Cases Tratados

| Entrada | Tratamento |
|---|---|
| `E#` | Mapeado para semitom 5 (igual F) |
| `B#` | Mapeado para semitom 0 (igual C) |
| `Cb` | Mapeado para semitom 11 (igual B) |
| `Fb` | Mapeado para semitom 4 (igual E) |
| Nota inválida | Fallback para C |

## Banco de Acordes (`chordDb.ts`)

Arquivo puro TS, sem dependências. Dicionário flat `Record<string, Record<string, string>>` com shapes em formato CSV (ex: `"x,3,2,0,1,0"`). Cobre **12 tonalidades** para maior, menor, sétima e dim, em violão e cavaco.

### `getChordShape(instrument, chordName)`

1. Tenta lookup exato (`Dm7`)
2. Tenta sem extensão (`Dm7` → `Dm`)
3. Retorna `null` → componente exibe fallback "Diagrama não mapeado"

### Formato das Strings

| Símbolo | Significado |
|---|---|
| `0` | Corda solta |
| `x` | Corda mutada |
| `1`–`12` | Casa a ser pressionada |

Violão: 6 valores separados por vírgula (cordas 6→1).  
Cavaco: 4 valores (cordas 4→1).

## Componente `<ChordDiagram />`

SVG puro, `100×120` px (`viewBox`), renderizado com `w-24 h-32` via CSS. Props:

```ts
interface Props {
  instrument: string
  chordName: string
}
```

O componente chama `getChordShape()` internamente. Se não encontrar shape, renderiza fallback com "Diagrama não mapeado" + nome do acorde.

**Renderização:**
1. Fundo escuro (`#27272a`) para o braço, com 4 trastes (5 linhas horizontais)
2. Linhas verticais para cordas (6 ou 4, espaçamento proporcional)
3. Nut (linha 0) mais grossa que as demais
4. Se acorde inicia após casa 1: número da casa inicial no canto superior esquerdo (sem sufixo "fr")
5. Se acorde ultrapassa 4 casas: cálculo automático da casa inicial (`minFret`)
6. `X` estilizado para corda mutada, `O` vazado para corda solta
7. Círculos laranja (`#f97316`) nas posições dos trastes
8. Fallback: div estilizada com "Diagrama não mapeado"

## Layout e Responsividade

- **Mobile-first**: `max-w-3xl` para o conteúdo principal, `px-4` nas laterais
- **Desktop** (>= `lg`): anúncios laterais fixos (skyscraper 160×600)
- **Mobile** (< `lg`): anúncios como banners horizontais (728×90)
- Dark mode padrão, sem toggle (`bg-zinc-950`)

## SEO e Metadados

Gerenciados via `metadata` export no `layout.tsx`:

| Campo | Valor |
|---|---|
| `title` | Qual o Tom App \| Campo Harmônico e Progressões na Prática |
| `description` | Descubra o campo harmônico, dicionário de acordes... |
| `keywords` | campo harmônico, qual o tom, acordes violão... |
| `applicationName` | Qual o Tom App |
| `openGraph` | title, description, type: website, locale: pt_BR |
| `icons.icon` | favicon.ico (any), favicon-16x16.png, favicon-32x32.png, icon.png |
| `icons.apple` | apple-touch-icon.png (180×180) |

Viewport config exportada separadamente (`themeColor: #09090b`, `initialScale: 1`).

## PWA Manifest

Gerado via `src/app/manifest.ts` (rota `/manifest.webmanifest`):

| Campo | Valor |
|---|---|
| `name` | Qual o Tom App |
| `display` | standalone |
| `background_color` / `theme_color` | #09090b |
| `icons` | android-chrome-192x192.png e 512x512.png |

## Convenções de Código

- `"use client"` apenas onde há interatividade (useState, onClick)
- Sem comentários no código (salvo documentação)
- Sem CSS modules — tudo Tailwind utility classes
- Tipos exportados em `mockData.ts` ou `musicEngine.ts`
