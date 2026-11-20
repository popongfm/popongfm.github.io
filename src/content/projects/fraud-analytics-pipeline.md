---
title: { en: "Fraud Analytics Pipeline" }
summary: { en: "About 1.85 million simulated card transactions, from PostgreSQL to a Looker Studio dashboard in one command." }
constellation: data
order: 0
brightness: 2
status: done
role: { en: "Built end to end." }
context: "AIE321 final project"
year: "2026"
tools: ["PostgreSQL 16", "Docker Compose", "pandas", "Google Sheets", "Looker Studio"]
links: { github: "https://github.com/popongfm/AIE321_FinalProj_BigData_Pipeline" }
---
Ingest into PostgreSQL 16 (Docker Compose), transform and engineer features such as time of day, channel and Haversine distance, publish about 11 summary tables to Google Sheets, and feed a Looker Studio dashboard. One command, `run_pipeline.py`, runs every stage.
