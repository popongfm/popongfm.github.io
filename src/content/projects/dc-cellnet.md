---
title: { en: "DC-CellNet" }
summary: { en: "Blood cell detection research: benchmarking 12 YOLO checkpoints against a fine-tuned Faster R-CNN." }
constellation: medical
order: 1
brightness: 3
featured: 3
status: in-progress
role: { en: "Ran the benchmark and built the reproducible evaluation pipeline." }
context: "Research project"
year: "2025 – 2026"
tools: ["PyTorch", "torchvision", "Ultralytics YOLO", "Faster R-CNN", "Python CLI"]
links: { github: "https://github.com/popongfm/DC-CellNet" }
---
Blood Cell Detection: YOLO vs. Faster R-CNN. I benchmarked 12 YOLO checkpoints (YOLO26m, YOLO11m, YOLOv8m and YOLOv8l) against a fine-tuned Faster R-CNN (ResNet-50-FPN) for three-class blood cell detection: red cells, white cells and platelets.

YOLO26m came out best, with **89.2% mAP50** and **83.9% F1** on a held-out test set, 6.9 F1 points above the Faster R-CNN baseline.

I built the evaluation as a reproducible Python command-line pipeline that produces ranked reports, generalization-gap analysis and score and NMS threshold sweeps, and traced most false positives to class imbalance (red cells are 85% of labels), which informs the next steps on latency and FP/FN operating points.
