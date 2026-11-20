// Card texts are Claude's drafts from Mickie's CV/portfolio facts — Mickie to review/replace.
export interface TarotCard {
  id: 'fool' | 'magician' | 'star';
  numeral: '0' | 'I' | 'XVII';
  name: string;
  slot: 'past' | 'present' | 'future';
  rune: string;
  meaning: string;
  text: { en: string; th?: string };
}

export const TAROT: TarotCard[] = [
  { id: 'fool', numeral: '0', name: 'The Fool', slot: 'past', rune: 'ᚠ', meaning: 'beginnings, a leap of faith',
    text: { en: 'Bangkok University, 2024. The first step into AI engineering and data science — and, a year later, the first prototype of Medi-Ident AI shown at the Open House.' } },
  { id: 'magician', numeral: 'I', name: 'The Magician', slot: 'present', rune: 'ᚲ', meaning: 'skill, making with the tools at hand',
    text: { en: 'Training vision models and getting them running behind real apps: blood cell detection research, database design for medicine identification, and pipelines that rebuild everything with one command.' } },
  { id: 'star', numeral: 'XVII', name: 'The Star', slot: 'future', rune: 'ᛏ', meaning: 'hope, guidance, a light to steer by',
    text: { en: 'A 6-month Data Science or MLOps co-op from June 2027 — and a path toward the two things I keep looking up at: medical AI and space technology.' } },
];
