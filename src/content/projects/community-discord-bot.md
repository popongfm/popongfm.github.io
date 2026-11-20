---
title: { en: "Community Management Discord Bot" }
summary: { en: "A paid freelance bot for a 160-member gaming community, syncing members and absences to Google Sheets." }
constellation: data
order: 4
brightness: 2
status: done
role: { en: "Freelance developer (paid contract)." }
context: "Client work"
year: "Jul 2026 – Jan 2027"
tools: ["Python", "discord.py", "gspread", "Google Sheets"]
links: { github: "https://github.com/popongfm/DiscordBot" }
---
Members register characters through a form, officers approve with buttons, and the bot assigns roles and syncs nicknames. It also records absences and voice-channel head counts. Data goes to Google Sheets through gspread, with writes serialized to handle concurrent users, validation, and automatic CSV backups. Thai and English commands share one implementation, and the logic has local unit tests that need no Discord or Google credentials.
