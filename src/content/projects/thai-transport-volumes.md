---
title: { en: "Thai Transport Volumes", th: "Thai Transport Volumes" }
summary: { en: "Road, water, rail and air passenger records, rebuilt from raw files with one command.", th: "ข้อมูลผู้โดยสารทางถนน ทางน้ำ ทางราง และทางอากาศ สร้างใหม่ทั้งหมดจากไฟล์ดิบด้วยคำสั่งเดียว" }
constellation: data
order: 2
brightness: 1
status: done
role: { en: "Built the workflow and pipeline for a group of 3.", th: "สร้าง workflow และ pipeline ให้กลุ่ม 3 คน" }
context: "AIE314/AIE315 final project"
contextTh: "โปรเจกต์จบวิชา AIE314/AIE315"
yearTh: "2026"
year: "2026"
tools: ["pandas", "pytest", "Matplotlib"]
links: { github: "https://github.com/popongfm/AIE314-FinalProj_DataPrep-Mining" }
---
A team analysis where each member owned one question: weekday versus weekend, early 2569 versus early 2568, or international arrivals versus departures. I built the workflow and the pipeline behind it: the code split into modules, a single `run_all.py` command that rebuilds the prepared datasets and every figure from the raw files, and 35 pytest tests.
