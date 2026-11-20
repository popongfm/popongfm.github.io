// Card texts are Claude's drafts from Mickie's CV/portfolio facts — Mickie to review/replace.
export interface TarotCard {
  id: 'fool' | 'magician' | 'star';
  numeral: '0' | 'I' | 'XVII';
  name: string;
  nameTh: string;
  slot: 'past' | 'present' | 'future';
  rune: string;
  meaning: { en: string; th: string };
  text: { en: string; th?: string };
}

export const TAROT: TarotCard[] = [
  { id: 'fool', numeral: '0', name: 'The Fool', nameTh: 'คนเขลา', slot: 'past', rune: 'ᚠ', meaning: { en: 'beginnings, a leap of faith', th: 'การเริ่มต้น การก้าวกระโดดด้วยศรัทธา' },
    text: { en: 'Bangkok University, 2024. The first step into AI engineering and data science — and, a year later, the first prototype of Medi-Ident AI shown at the Open House.', th: 'มหาวิทยาลัยกรุงเทพ ปี 2024 ก้าวแรกสู่วิศวกรรม AI และวิทยาการข้อมูล และอีกหนึ่งปีต่อมา ต้นแบบแรกของ Medi-Ident AI ก็ได้จัดแสดงในงาน Open House' } },
  { id: 'magician', numeral: 'I', name: 'The Magician', nameTh: 'นักมายากล', slot: 'present', rune: 'ᚲ', meaning: { en: 'skill, making with the tools at hand', th: 'ทักษะ การสร้างสรรค์ด้วยเครื่องมือที่มี' },
    text: { en: 'Training vision models and getting them running behind real apps: blood cell detection research, database design for medicine identification, and pipelines that rebuild everything with one command.', th: 'เทรนโมเดลด้านภาพและทำให้มันทำงานได้จริงในแอป ทั้งงานวิจัยตรวจจับเซลล์เม็ดเลือด การออกแบบฐานข้อมูลสำหรับระบุยา และ pipeline ที่สร้างทุกอย่างใหม่ได้ด้วยคำสั่งเดียว' } },
  { id: 'star', numeral: 'XVII', name: 'The Star', nameTh: 'ดวงดาว', slot: 'future', rune: 'ᛏ', meaning: { en: 'hope, guidance, a light to steer by', th: 'ความหวัง การนำทาง แสงที่ใช้กำหนดทิศ' },
    text: { en: 'A 6-month Data Science or MLOps co-op from June 2027 — and a path toward the two things I keep looking up at: medical AI and space technology.', th: 'สหกิจศึกษา 6 เดือนด้าน Data Science หรือ MLOps เริ่มมิถุนายน 2027 และเส้นทางสู่สองสิ่งที่ฉันมองขึ้นไปเสมอ คือ AI ทางการแพทย์และเทคโนโลยีอวกาศ' } },
];
