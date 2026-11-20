---
title: { en: "Game Genre Prediction", th: "Game Genre Prediction" }
summary: { en: "A PDPA-compliant survey of 109 players and a multi-label Random Forest across 8 genres.", th: "แบบสำรวจตาม PDPA จากผู้เล่น 109 คน และ Random Forest แบบ multi-label สำหรับเกม 8 แนว" }
constellation: data
order: 3
brightness: 1
status: done
role: { en: "Co-designed the survey; built the clean, train, visualize pipeline.", th: "ร่วมออกแบบแบบสำรวจ และสร้าง pipeline ทำความสะอาด เทรน และแสดงผล" }
context: "AIE225 coursework"
contextTh: "งานวิชา AIE225"
yearTh: "พ.ค. 2026"
year: "May 2026"
tools: ["pandas", "scikit-learn", "Random Forest"]
links: { github: "https://github.com/popongfm/Game-Genres-Prediction" }
---
Co-designed a PDPA-compliant survey and collected 109 responses on gaming motivations, habits and spending, then cleaned and encoded the data with pandas in a three-step pipeline (clean, train, visualize). A multi-label Random Forest across 8 genres reached a best F1 of 0.62 for RPG and 0.61 for MOBA, and class imbalance explained the low recall on minority genres.
