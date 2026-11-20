---
title: { en: "Fraud Analytics Pipeline", th: "Fraud Analytics Pipeline" }
summary: { en: "About 1.85 million simulated card transactions, from PostgreSQL to a Looker Studio dashboard in one command.", th: "ธุรกรรมบัตรจำลองราว 1.85 ล้านรายการ จาก PostgreSQL สู่แดชบอร์ด Looker Studio ด้วยคำสั่งเดียว" }
constellation: data
order: 0
brightness: 2
status: done
role: { en: "Built end to end.", th: "สร้างทั้งระบบตั้งแต่ต้นจนจบ" }
context: "AIE321 final project"
contextTh: "โปรเจกต์จบวิชา AIE321"
yearTh: "2026"
year: "2026"
tools: ["PostgreSQL 16", "Docker Compose", "pandas", "Google Sheets", "Looker Studio"]
links: { github: "https://github.com/popongfm/AIE321_FinalProj_BigData_Pipeline" }
---
Ingest into PostgreSQL 16 (Docker Compose), transform and engineer features such as time of day, channel and Haversine distance, publish about 11 summary tables to Google Sheets, and feed a Looker Studio dashboard. One command, `run_pipeline.py`, runs every stage.
