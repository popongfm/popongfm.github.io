---
title: { en: "Hospital Information System", th: "Hospital Information System" }
summary: { en: "A hospital system on Supabase with role-based access, a read-only AI assistant, and tested deploys.", th: "ระบบโรงพยาบาลบน Supabase ที่มีสิทธิ์การเข้าถึงตามบทบาท ผู้ช่วย AI แบบอ่านอย่างเดียว และการ deploy ที่ผ่านการทดสอบ" }
constellation: medical
order: 2
brightness: 2
status: done
role: { en: "Built end to end: schema, AI assistant, Docker deploy and CI.", th: "สร้างทั้งระบบตั้งแต่ต้นจนจบ: schema, ผู้ช่วย AI, การ deploy ด้วย Docker และ CI" }
context: "AIE313 final project"
contextTh: "โปรเจกต์จบวิชา AIE313"
yearTh: "2026"
year: "2026"
tools: ["PostgreSQL", "Supabase", "Row-level security", "Edge Functions", "Docker", "Render", "GitHub Actions", "Playwright"]
links: { github: "https://github.com/popongfm/AIE313-FinalProj_HospitalSystem" }
---
Role-based access for patients, doctors, pharmacists, nurses, technicians and admins. I designed the PostgreSQL schema (21 tables, 10 views, row-level security) and a read-only AI chat assistant that answers from the views and proposes appointments, saved only after the user confirms.

It ships as a Docker image hosted on Render, with GitHub Actions running database, Edge Function, Playwright and end-to-end tests before each deploy.
