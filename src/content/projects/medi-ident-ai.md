---
title: { en: "Medi-Ident AI" }
summary: { en: "An Android app that identifies hypertension medications (33 classes) from a photo of the pill." }
constellation: medical
order: 0
brightness: 3
featured: 1
status: in-progress
role: { en: "Designed the PostgreSQL schema on Supabase and the API calls that fetch drug information after a pill is detected. A senior teammate designed the server and the app." }
context: "Team project · exhibited at PRIS 2026"
year: "2025 – 2026"
tools: ["YOLO11s", "PostgreSQL", "Supabase", "FastAPI", "Ubuntu", "ngrok"]
---
First shown as a prototype at the Bangkok University Open House 2025, then exhibited at PRIS 2026 (Pharmacy Research & Innovation Summit) on 29–30 Oct 2026 at IMPACT Arena, Muang Thong Thani, and at the Open House 2026.

## How a photo becomes an answer

1. **Android app** — Flutter, built by a senior teammate. Sends the pill photo over HTTPS.
2. **ngrok tunnel** — forwards HTTPS to the server on localhost.
3. **FastAPI server** — on a Mini PC running Ubuntu. YOLO11s detects the pills through `POST /detect/`, then `GET /medicines/` fetches the details.
4. **Supabase database** — PostgreSQL tables for generic names and drugs. **This is the part I designed.**

## What I built

The PostgreSQL schema on Supabase: generic names, brand names, indications and image paths, with the relations between them — and the API calls that fetch drug information after a pill is detected.

## What I can run

I set up the Mini PC, the server and the tunnel after the senior who designed it handed the system over to me. I can retrain the YOLO model and swap in a new `best.pt`.

## Honest status

The app is a local demo with no public download. The tunnel is a prototype setup, not a production deployment. Moving to a stable host is the next step I want to learn.
