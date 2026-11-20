---
title: { en: "DC-CellNet", th: "DC-CellNet" }
summary: { en: "Blood cell detection research, restructured from a BCCD proof of concept that benchmarked 12 YOLO checkpoints against a fine-tuned Faster R-CNN.", th: "งานวิจัยตรวจจับเซลล์เม็ดเลือด ที่ปรับโครงสร้างใหม่จาก proof of concept บนชุดข้อมูล BCCD ซึ่งเปรียบเทียบ YOLO 12 checkpoint กับ Faster R-CNN ที่ fine-tune แล้ว" }
constellation: medical
order: 1
brightness: 3
featured: 3
status: in-progress
role: { en: "Ran the proof-of-concept benchmark, built its reproducible evaluation pipeline, and am restructuring the research as DC-CellNet.", th: "ทำ benchmark ในขั้น proof of concept และสร้าง pipeline ประเมินผลที่ทำซ้ำได้ ตอนนี้กำลังปรับโครงสร้างงานวิจัยเป็น DC-CellNet" }
context: "Research project"
contextTh: "โปรเจกต์วิจัย"
yearTh: "2025 – 2026"
year: "2025 – 2026"
tools: ["PyTorch", "torchvision", "Ultralytics YOLO", "Faster R-CNN", "Python CLI"]
links: { github: "https://github.com/popongfm/DC-CellNet" }
---
DC-CellNet is the restructured continuation of my blood cell detection research. It builds on an earlier proof of concept on the BCCD dataset.

## Proof of concept: YOLO vs. Faster R-CNN on BCCD

I benchmarked 12 YOLO checkpoints (YOLO26m, YOLO11m, YOLOv8m and YOLOv8l) against a fine-tuned Faster R-CNN (ResNet-50-FPN) for three-class blood cell detection: red cells, white cells and platelets.

YOLO26m came out best, with **89.2% mAP50** and **83.9% F1** on a held-out test set, 6.9 F1 points above the Faster R-CNN baseline.

I built the evaluation as a reproducible Python command-line pipeline that produces ranked reports, generalization-gap analysis and score and NMS threshold sweeps, and traced most false positives to class imbalance (red cells are 85% of labels), which informs the next steps on latency and FP/FN operating points.

[Proof-of-concept code on GitHub ↗](https://github.com/popongfm/Blood-Cell-Detection)
