// TH strings drafted by Claude — review with Mickie
import type { Locale } from '../data/site';

export const ui = {
  'nav.work': { en: 'Work', th: 'ผลงาน' },
  'nav.about': { en: 'About', th: 'เกี่ยวกับฉัน' },
  'nav.cv': { en: 'CV', th: 'ประวัติ' },
  'nav.contact': { en: 'Contact', th: 'ติดต่อ' },
  'nav.label': { en: 'Main', th: 'Main' },
  'skip': { en: 'Skip to content', th: 'ข้ามไปยังเนื้อหา' },
  'cta.begin': { en: 'Begin the journey', th: 'เริ่มการเดินทาง' },
  'cta.quick': { en: 'Quick view', th: 'ดูแบบย่อ' },
  'fallback.notice': { en: 'Thai version not available yet — showing English', th: 'ยังไม่มีฉบับภาษาไทย — แสดงเป็นภาษาอังกฤษ' },
  'featured.label': { en: 'Featured', th: 'ผลงานเด่น' },
  'status.inProgress': { en: 'In progress', th: 'กำลังดำเนินการ' },
  'status.done': { en: 'Completed', th: 'เสร็จแล้ว' },
  'rune.traditional': { en: 'traditional meaning', th: 'ความหมายตามประเพณี' },
  'tarot.past': { en: 'Past', th: 'อดีต' },
  'tarot.present': { en: 'Present', th: 'ปัจจุบัน' },
  'tarot.future': { en: 'Future', th: 'อนาคต' },
  'tarot.hint': { en: 'Turn a card to read it.', th: 'แตะไพ่เพื่อเปิดอ่าน' },
  'sky.recenter': { en: 'Recenter the sky', th: 'กลับสู่กลางท้องฟ้า' },
  'sky.close': { en: 'Close', th: 'ปิด' },
  'sky.hint': { en: 'Drag to look around · choose a star', th: 'ลากเพื่อมองรอบๆ · เลือกดาวสักดวง' },
  'sky.open': { en: 'Read the full page', th: 'อ่านหน้าเต็ม' },
  'work.title': { en: 'Work', th: 'ผลงาน' },
  'work.intro': { en: 'Grouped by constellation. I describe only what I did myself.', th: 'จัดกลุ่มตามกลุ่มดาว ฉันเล่าเฉพาะส่วนที่ฉันลงมือทำเอง' },
  'work.role': { en: 'My role', th: 'บทบาทของฉัน' },
  'work.tools': { en: 'Tools', th: 'เครื่องมือ' },
  'work.back': { en: 'All work', th: 'ผลงานทั้งหมด' },
  'about.title': { en: 'About', th: 'เกี่ยวกับฉัน' },
  'skills.title': { en: 'Skills', th: 'ทักษะ' },
  'contact.title': { en: "Let's talk", th: 'คุยกันได้' },
  'contact.body': { en: "I'm applying for internships in data science, ML engineering and MLOps. The fastest way to reach me is email.", th: 'ฉันกำลังหาที่ฝึกงานด้าน Data Science, ML Engineering และ MLOps ติดต่อเร็วที่สุดทางอีเมล' },
  'chronicle.title': { en: 'Chronicle', th: 'บันทึกการเดินทาง' },
  'certs.title': { en: 'Certificates', th: 'ใบรับรอง' },
  'cv.title': { en: 'Curriculum Vitae', th: 'ประวัติย่อ' },
  'cv.download': { en: 'Download PDF', th: 'ดาวน์โหลด PDF' },
  'cv.education': { en: 'Education', th: 'การศึกษา' },
} as const;

export type UiKey = keyof typeof ui;

export function t(locale: Locale, key: UiKey): string {
  return ui[key][locale];
}

export function localePath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'en') return p;
  return p === '/' ? '/th/' : `/th${p}`;
}

export function altLocale(locale: Locale): Locale {
  return locale === 'en' ? 'th' : 'en';
}

export function stripLocale(pathname: string): string {
  const p = pathname.replace(/^\/th(?=\/|$)/, '') || '/';
  return p.length > 1 ? p.replace(/\/$/, '') : p;
}
