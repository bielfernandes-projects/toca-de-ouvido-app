export const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
export type Note = (typeof notes)[number]

export const accidentals = ['#', 'b'] as const
export type Accidental = (typeof accidentals)[number]

export const modes = [
  { label: 'Maior', value: '' },
  { label: 'Menor', value: 'm' },
] as const

export interface ProgressionPattern {
  name: string
  numerals: string[]
}

export const progressionPatterns: ProgressionPattern[] = [
  { name: 'Samba/Pagode (Quadradinho)', numerals: ['I', 'VI7', 'IIm7', 'V7'] },
  { name: 'Pop / Sertanejo Universitário', numerals: ['I', 'V', 'VIm', 'IV'] },
  { name: 'Sofrência / Piseiro / Forró Moderno', numerals: ['VIm', 'IV', 'I', 'V'] },
  { name: 'Brega Clássico / Jovem Guarda', numerals: ['I', 'VIm', 'IV', 'V'] },
  { name: 'Brega Romântico / Arrocha', numerals: ['I', 'IIIm', 'IV', 'V'] },
  { name: 'Rock', numerals: ['I', 'IV', 'V', 'IV'] },
  { name: 'Reggae / Forró Xote Raiz', numerals: ['I', 'IV', 'I', 'IV'] },
]
