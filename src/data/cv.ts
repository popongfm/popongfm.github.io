export const education = {
  degree: 'B.Eng. in Artificial Intelligence Engineering and Data Science',
  school: 'Bangkok University',
  years: '2024 – expected 2028',
  gpax: 'GPAX 3.36',
  coursework: 'Coursework includes Data Structures and Algorithms, Natural Language Processing, Data Preparation and Data Mining, and Databases.',
};

export const SKILLS: { group: string; items: string }[] = [
  { group: 'Models', items: 'PyTorch, torchvision, scikit-learn, Ultralytics YOLO (detection and segmentation), Faster R-CNN; evaluation with mAP, precision, recall, F1 and threshold tuning' },
  { group: 'Deployment', items: 'Serving a model behind an API on an Ubuntu Mini PC, exposed through an ngrok tunnel' },
  { group: 'MLOps and DevOps', items: 'Docker and Docker Compose, GitHub Actions CI/CD, Render, Playwright and end-to-end tests, pytest' },
  { group: 'Data', items: 'PostgreSQL and Supabase (row-level security, Edge Functions), schema design, pandas, NumPy, SQLAlchemy, Matplotlib and Seaborn, Google Sheets and Looker Studio pipelines' },
  { group: 'Robotics', items: 'ROS 2 Humble, Gazebo, TurtleBot3' },
  { group: 'Tools', items: 'Git and GitHub, Linux (Ubuntu), Roboflow' },
  { group: 'Languages', items: 'Python and SQL; Thai (native) and English' },
  { group: 'Interests', items: 'Space technology and astrophysics; medical AI and computer vision' },
];

export const CHRONICLE: { title: string; when: string; role: string; text: string }[] = [
  { title: 'PERSPECTIVE by Black Dot: Tic-Tac-Toe robot demo', when: 'Episode published 16 Nov 2026', role: 'Operator',
    text: "Ran the department's Tic-Tac-Toe robot system for a Bangkok University episode of PERSPECTIVE. A PLC drives the robot arm and computer vision with YOLO reads the board. I did not develop the whole system: my advisor taught me to run it and to fix basic bugs when problems come up." },
  { title: 'Bangkok University Open House 2026', when: '2026', role: 'Exhibitor', text: 'Exhibited the updated Medi-Ident AI at the booth.' },
  { title: 'PRIS 2026, Pharmacy Research and Innovation Summit', when: '29–30 Oct 2026', role: 'Exhibitor',
    text: 'Exhibited Medi-Ident AI at the national pharmacy research and innovation conference at IMPACT Arena, Muang Thong Thani, and demonstrated the app to visitors at the booth.' },
  { title: 'ispace Lunar Mission Workshop', when: 'Sep 2026', role: 'Selected participant',
    text: 'One of 31 participants selected from an open online application, with ispace Inc., NSTDA, GISTDA and Kasetsart University. Proposed a lunar biology payload using the cnidarian Hydra.' },
  { title: 'BU x EPE Packaging AI Bootcamp and Workshop', when: 'Aug – Sep 2026', role: 'Technical and teaching assistant',
    text: 'Assisted instructors in teaching hands-on AI sessions to 60 employees of EPE Packaging (Thailand), guided participants through the exercises and resolved technical issues.' },
  { title: 'EPE x BU AI Showcase & Awards 2026', when: '2026', role: 'Guest', text: 'Attended the pitching day that followed the EPE bootcamp and workshop.' },
  { title: 'BU x SCG Hackathon Route Optimization', when: '2026', role: 'Technical assistant',
    text: 'Set up event infrastructure and gave on-site device support to 30 finalist teams (90 participants).' },
  { title: 'AI Hackathon Elephant Identification', when: '25–26 Oct 2025', role: 'Staff Technique',
    text: "Set up event infrastructure and gave on-site device support to 30 finalist teams (90 participants). Handled technical and code issues, stayed out of the contestants' own work, and monitored the competition for cheating." },
  { title: 'Bangkok University Open House 2025', when: '2025', role: 'Two roles',
    text: "Showed the first prototype of Medi-Ident AI at the booth, and worked as technical staff for the department's workshop, Introduction to Data Analytics with Supply Chain Game." },
];

export const CERTIFICATES: { title: string; issuer: string; when: string; note?: string }[] = [
  { title: 'Python Programming Mastery', issuer: 'Skooldio', when: '20 Nov 2025', note: 'Part of a four-course Python track: Intro to Programming with Python (4 Mar 2025), Foundations (28 Aug 2025), Efficiency and Techniques (7 Nov 2025).' },
  { title: 'Mathematics for Data Science', issuer: 'Skooldio', when: '30 Oct 2025' },
  { title: 'AI Hackathon Elephant Identification — Certificate of Achievement, Staff Technique', issuer: 'School of Engineering, Bangkok University', when: '25–26 Oct 2025' },
];
