---
title: { en: "Hospital Information System" }
summary: { en: "A hospital system on Supabase with role-based access, a read-only AI assistant, and tested deploys." }
constellation: medical
order: 2
brightness: 2
status: done
role: { en: "Built end to end: schema, AI assistant, Docker deploy and CI." }
context: "AIE313 final project"
year: "2026"
tools: ["PostgreSQL", "Supabase", "Row-level security", "Edge Functions", "Docker", "Render", "GitHub Actions", "Playwright"]
---
Role-based access for patients, doctors, pharmacists, nurses, technicians and admins. I designed the PostgreSQL schema (21 tables, 10 views, row-level security) and a read-only AI chat assistant that answers from the views and proposes appointments, saved only after the user confirms.

It ships as a Docker image hosted on Render, with GitHub Actions running database, Edge Function, Playwright and end-to-end tests before each deploy.
