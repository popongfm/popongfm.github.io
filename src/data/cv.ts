import type { Locale } from './site';
type L = { en: string; th: string };
export const pick = (x: L, l: Locale) => x[l];

export const education = {
  degree: { en: 'B.Eng. in Artificial Intelligence Engineering and Data Science', th: 'วศ.บ. สาขาวิศวกรรมปัญญาประดิษฐ์และวิทยาการข้อมูล' },
  school: { en: 'Bangkok University', th: 'มหาวิทยาลัยกรุงเทพ' },
  years: { en: '2024 – expected 2028', th: '2024 – คาดว่าจบ 2028' },
  gpax: { en: 'GPAX 3.36', th: 'GPAX 3.36' },
  coursework: { en: 'Coursework includes Data Structures and Algorithms, Natural Language Processing, Data Preparation and Data Mining, and Databases.', th: 'วิชาที่เรียน เช่น โครงสร้างข้อมูลและอัลกอริทึม การประมวลผลภาษาธรรมชาติ การเตรียมข้อมูลและการทำเหมืองข้อมูล และฐานข้อมูล' },
};

export const SKILLS: { group: L; items: L }[] = [
  { group: { en: 'Models', th: 'โมเดล' }, items: { en: 'PyTorch, torchvision, scikit-learn, Ultralytics YOLO (detection and segmentation), Faster R-CNN; evaluation with mAP, precision, recall, F1 and threshold tuning', th: 'PyTorch, torchvision, scikit-learn, Ultralytics YOLO (detection และ segmentation), Faster R-CNN; ประเมินผลด้วย mAP, precision, recall, F1 และการปรับ threshold' } },
  { group: { en: 'Deployment', th: 'การ deploy' }, items: { en: 'Serving a model behind an API on an Ubuntu Mini PC, exposed through an ngrok tunnel', th: 'ให้บริการโมเดลผ่าน API บน Mini PC ที่ใช้ Ubuntu เปิดออกสู่ภายนอกผ่าน ngrok tunnel' } },
  { group: { en: 'MLOps and DevOps', th: 'MLOps และ DevOps' }, items: { en: 'Docker and Docker Compose, GitHub Actions CI/CD, Render, Playwright and end-to-end tests, pytest', th: 'Docker และ Docker Compose, GitHub Actions CI/CD, Render, Playwright และ end-to-end test, pytest' } },
  { group: { en: 'Data', th: 'ข้อมูล' }, items: { en: 'PostgreSQL and Supabase (row-level security, Edge Functions), schema design, pandas, NumPy, SQLAlchemy, Matplotlib and Seaborn, Google Sheets and Looker Studio pipelines', th: 'PostgreSQL และ Supabase (row-level security, Edge Functions), การออกแบบ schema, pandas, NumPy, SQLAlchemy, Matplotlib และ Seaborn, pipeline สู่ Google Sheets และ Looker Studio' } },
  { group: { en: 'Robotics', th: 'หุ่นยนต์' }, items: { en: 'ROS 2 Humble, Gazebo, TurtleBot3', th: 'ROS 2 Humble, Gazebo, TurtleBot3' } },
  { group: { en: 'Tools', th: 'เครื่องมือ' }, items: { en: 'Git and GitHub, Linux (Ubuntu), Roboflow', th: 'Git และ GitHub, Linux (Ubuntu), Roboflow' } },
  { group: { en: 'Languages', th: 'ภาษา' }, items: { en: 'Python and SQL; Thai (native) and English', th: 'Python และ SQL; ภาษาไทย (ภาษาแม่) และภาษาอังกฤษ' } },
  { group: { en: 'Interests', th: 'ความสนใจ' }, items: { en: 'Space technology and astrophysics; medical AI and computer vision', th: 'เทคโนโลยีอวกาศและฟิสิกส์ดาราศาสตร์; AI ทางการแพทย์และ computer vision' } },
];

export const CHRONICLE: { title: string; when: L; role: L; text: L }[] = [
  { title: 'PERSPECTIVE by Black Dot: Tic-Tac-Toe robot demo', when: { en: 'Episode published 16 Nov 2026', th: 'ออกอากาศ 16 พ.ย. 2026' }, role: { en: 'Operator', th: 'ผู้ควบคุมระบบ' },
    text: { en: "Ran the department's Tic-Tac-Toe robot system for a Bangkok University episode of PERSPECTIVE. A PLC drives the robot arm and computer vision with YOLO reads the board. I did not develop the whole system: my advisor taught me to run it and to fix basic bugs when problems come up.", th: 'ควบคุมระบบหุ่นยนต์เล่น Tic-Tac-Toe ของภาควิชาในตอนของมหาวิทยาลัยกรุงเทพในรายการ PERSPECTIVE โดย PLC ขับแขนกล และ computer vision ด้วย YOLO อ่านกระดาน ฉันไม่ได้พัฒนาทั้งระบบ อาจารย์ที่ปรึกษาสอนให้ฉันควบคุมระบบและแก้บั๊กพื้นฐานเมื่อมีปัญหา' } },
  { title: 'Bangkok University Open House 2026', when: { en: '2026', th: '2026' }, role: { en: 'Exhibitor', th: 'ผู้จัดแสดงผลงาน' },
    text: { en: 'Exhibited the updated Medi-Ident AI at the booth.', th: 'จัดแสดง Medi-Ident AI เวอร์ชันปรับปรุงที่บูธ' } },
  { title: 'PRIS 2026, Pharmacy Research and Innovation Summit', when: { en: '29–30 Oct 2026', th: '29–30 ต.ค. 2026' }, role: { en: 'Exhibitor', th: 'ผู้จัดแสดงผลงาน' },
    text: { en: 'Exhibited Medi-Ident AI at the national pharmacy research and innovation conference at IMPACT Arena, Muang Thong Thani, and demonstrated the app to visitors at the booth.', th: 'จัดแสดง Medi-Ident AI ในงานประชุมวิจัยและนวัตกรรมทางเภสัชกรรมระดับชาติ ณ อิมแพ็ค อารีนา เมืองทองธานี และสาธิตแอปให้ผู้เข้าชมที่บูธ' } },
  { title: 'ispace Lunar Mission Workshop', when: { en: 'Sep 2026', th: 'ก.ย. 2026' }, role: { en: 'Selected participant', th: 'ผู้เข้าร่วมที่ได้รับคัดเลือก' },
    text: { en: 'One of 31 participants selected from an open online application, with ispace Inc., NSTDA, GISTDA and Kasetsart University. Proposed a lunar biology payload using the cnidarian Hydra.', th: '1 ใน 31 ผู้เข้าร่วมที่ได้รับคัดเลือกจากการสมัครออนไลน์ ร่วมกับ ispace Inc., สวทช., GISTDA และมหาวิทยาลัยเกษตรศาสตร์ เสนอ payload ชีววิทยาบนดวงจันทร์โดยใช้ไฮดรา' } },
  { title: 'BU x EPE Packaging AI Bootcamp and Workshop', when: { en: 'Aug – Sep 2026', th: 'ส.ค. – ก.ย. 2026' }, role: { en: 'Technical and teaching assistant', th: 'ผู้ช่วยสอนและผู้ช่วยด้านเทคนิค' },
    text: { en: 'Assisted instructors in teaching hands-on AI sessions to 60 employees of EPE Packaging (Thailand), guided participants through the exercises and resolved technical issues.', th: 'ช่วยวิทยากรสอน AI แบบลงมือทำให้พนักงาน EPE Packaging (Thailand) 60 คน แนะนำผู้เข้าอบรมระหว่างทำแบบฝึกหัด และแก้ปัญหาทางเทคนิค' } },
  { title: 'EPE x BU AI Showcase & Awards 2026', when: { en: '2026', th: '2026' }, role: { en: 'Guest', th: 'ผู้เข้าร่วมงาน' },
    text: { en: 'Attended the pitching day that followed the EPE bootcamp and workshop.', th: 'เข้าร่วมวัน pitching ต่อจาก bootcamp และเวิร์กช็อปของ EPE' } },
  { title: 'BU x SCG Hackathon Route Optimization', when: { en: '2026', th: '2026' }, role: { en: 'Technical assistant', th: 'ผู้ช่วยด้านเทคนิค' },
    text: { en: 'Set up event infrastructure and gave on-site device support to 30 finalist teams (90 participants).', th: 'ติดตั้งระบบของงานและดูแลอุปกรณ์หน้างานให้ทีมเข้ารอบสุดท้าย 30 ทีม (90 คน)' } },
  { title: 'AI Hackathon Elephant Identification', when: { en: '25–26 Oct 2025', th: '25–26 ต.ค. 2025' }, role: { en: 'Staff Technique', th: 'สตาฟฝ่ายเทคนิค' },
    text: { en: "Set up event infrastructure and gave on-site device support to 30 finalist teams (90 participants). Handled technical and code issues, stayed out of the contestants' own work, and monitored the competition for cheating.", th: 'ติดตั้งระบบของงานและดูแลอุปกรณ์หน้างานให้ทีมเข้ารอบสุดท้าย 30 ทีม (90 คน) แก้ปัญหาด้านเทคนิคและโค้ดโดยไม่ยุ่งกับงานของผู้แข่งขัน และเฝ้าระวังการทุจริต' } },
  { title: 'Bangkok University Open House 2025', when: { en: '2025', th: '2025' }, role: { en: 'Two roles', th: 'สองบทบาท' },
    text: { en: "Showed the first prototype of Medi-Ident AI at the booth, and worked as technical staff for the department's workshop, Introduction to Data Analytics with Supply Chain Game.", th: 'จัดแสดงต้นแบบแรกของ Medi-Ident AI ที่บูธ และเป็นสตาฟเทคนิคในเวิร์กช็อปของภาควิชา Introduction to Data Analytics with Supply Chain Game' } },
];

export const CERTIFICATES: { title: string; issuer: L; when: L; note?: L }[] = [
  { title: 'Python Programming Mastery', issuer: { en: 'Skooldio', th: 'Skooldio' }, when: { en: '20 Nov 2025', th: '20 พ.ย. 2025' }, note: { en: 'Part of a four-course Python track: Intro to Programming with Python (4 Mar 2025), Foundations (28 Aug 2025), Efficiency and Techniques (7 Nov 2025).', th: 'ส่วนหนึ่งของหลักสูตร Python 4 คอร์ส: Intro to Programming with Python (4 มี.ค. 2025), Foundations (28 ส.ค. 2025), Efficiency and Techniques (7 พ.ย. 2025)' } },
  { title: 'Mathematics for Data Science', issuer: { en: 'Skooldio', th: 'Skooldio' }, when: { en: '30 Oct 2025', th: '30 ต.ค. 2025' } },
  { title: 'AI Hackathon Elephant Identification — Certificate of Achievement, Staff Technique', issuer: { en: 'School of Engineering, Bangkok University', th: 'คณะวิศวกรรมศาสตร์ มหาวิทยาลัยกรุงเทพ' }, when: { en: '25–26 Oct 2025', th: '25–26 ต.ค. 2025' } },
];
