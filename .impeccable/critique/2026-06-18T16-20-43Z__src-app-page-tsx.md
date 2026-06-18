---
target: homepage (page.tsx)
total_score: 28
p0_count: 0
p1_count: 2
p2_count: 2
p3_count: 2
timestamp: 2026-06-18T16-20-43Z
slug: src-app-page-tsx
---
# Design Critique: src/app/page.tsx

## Score: 28/40

## Heuristics
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No loading states (data is local) |
| 2 | Match System / Real World | 4 | N/A - solid |
| 3 | User Control and Freedom | 3 | No "clear selection" |
| 4 | Consistency and Standards | 3 | Ad placeholders look like functional UI |
| 5 | Error Prevention | 4 | N/A - solid |
| 6 | Recognition Rather Than Recall | 3 | "Sustenido"/"Bemol" may confuse beginners |
| 7 | Flexibility and Efficiency | 1 | No keyboard shortcuts |
| 8 | Aesthetic and Minimalist Design | 3 | Placeholders and footer create minor noise |
| 9 | Error Recovery | 3 | Read-only app, no errors to recover |
| 10 | Help and Documentation | 1 | No help, no tooltips, no onboarding |

## P0 Issues
(none)

## P1 Issues
1. Zero keyboard shortcuts for musicians with one hand occupied
2. No help or documentation for beginner audience

## P2 Issues
3. Ad placeholders styled as functional cards
4. 12 simultaneous choices at decision points (cognitive overload)

## P3 Issues
5. Light mode cards use border + shadow (anti-pattern)
6. ThemeToggle uses emoji instead of SVG icons
