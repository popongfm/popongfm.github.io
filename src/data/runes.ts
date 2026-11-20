export type ConstellationId = 'medical' | 'space' | 'robotics' | 'data';
export type PanelRuneId = 'skills' | 'about' | 'contact';

export interface Rune {
  char: string;
  name: string;
  meaning: { en: string; th: string };
}

export const RUNES: Record<ConstellationId | PanelRuneId, Rune> = {
  medical: { char: 'ᚢ', name: 'Uruz', meaning: { en: 'vitality, health', th: 'พลังชีวิต สุขภาพ' } },
  space: { char: 'ᛏ', name: 'Tiwaz', meaning: { en: 'the guiding star', th: 'ดาวนำทาง' } },
  robotics: { char: 'ᚱ', name: 'Raidho', meaning: { en: 'journey, motion', th: 'การเดินทาง การเคลื่อนที่' } },
  data: { char: 'ᚨ', name: 'Ansuz', meaning: { en: 'word, wisdom', th: 'ถ้อยคำ ปัญญา' } },
  skills: { char: 'ᚲ', name: 'Kenaz', meaning: { en: 'torch, knowledge, craft', th: 'คบเพลิง ความรู้ งานช่าง' } },
  about: { char: 'ᛗ', name: 'Mannaz', meaning: { en: 'humankind, the self', th: 'มนุษย์ ตัวตน' } },
  contact: { char: 'ᚷ', name: 'Gebo', meaning: { en: 'gift, exchange', th: 'ของขวัญ การแลกเปลี่ยน' } },
};

export const CONSTELLATION_ORDER: ConstellationId[] = ['medical', 'space', 'robotics', 'data'];
export const CONSTELLATION_LABEL: Record<ConstellationId, { en: string; th: string }> = {
  medical: { en: 'Medical AI', th: 'AI การแพทย์' },
  space: { en: 'Space', th: 'อวกาศ' },
  robotics: { en: 'Robotics & IIoT', th: 'หุ่นยนต์และ IIoT' },
  data: { en: 'Data & Pipelines', th: 'ข้อมูลและไปป์ไลน์' },
};

export const FUTHARK = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
export const LIT_RUNES = ['ᚢ', 'ᛏ', 'ᚱ', 'ᚨ', 'ᚲ', 'ᛗ', 'ᚷ'];

export function runeByChar(ch: string): (Rune & { id: ConstellationId | PanelRuneId }) | undefined {
  const hit = (Object.entries(RUNES) as [ConstellationId | PanelRuneId, Rune][]).find(([, r]) => r.char === ch);
  return hit ? { id: hit[0], ...hit[1] } : undefined;
}
