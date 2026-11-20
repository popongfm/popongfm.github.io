---
title: { en: "Factory AMR Prototype", th: "Factory AMR Prototype" }
summary: { en: "Dispatching autonomous mobile robots from quality control to the loading dock, with BLE indoor localization.", th: "ส่งหุ่นยนต์เคลื่อนที่อัตโนมัติ (AMR) ขนสินค้าจากจุดตรวจคุณภาพไปยังลานขึ้นสินค้า พร้อมระบุตำแหน่งในอาคารด้วย BLE" }
constellation: robotics
order: 1
brightness: 2
status: in-progress
role: { en: "Measured and placed BLE anchors, collected ground-truth positions, and helped form hypotheses for each round.", th: "วัดและวางตำแหน่ง anchor BLE เก็บตำแหน่งอ้างอิงจริง และช่วยตั้งสมมติฐานในแต่ละรอบการทดลอง" }
context: "IIoT prototype"
contextTh: "ต้นแบบ IIoT"
yearTh: "2026"
year: "2026"
tools: ["Bluetooth Low Energy", "ESP32", "RSSI filtering", "IIoT"]
---
A prototype that dispatches autonomous mobile robots to carry goods from quality control to the loading dock, designed around three user groups: QC staff, truck drivers and managers using a dashboard.

Part of the project is indoor localization of the robot with Bluetooth Low Energy, an experiment designed by our advisor. I measured and placed the anchors on the lab floor, collected the ground-truth positions, and helped form the hypotheses for each following round of experiments. A live view shows signal strength (RSSI) from four ESP32 anchors, raw against filtered, with a confidence value.
