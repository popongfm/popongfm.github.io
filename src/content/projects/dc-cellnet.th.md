---
---
DC-CellNet คืองานวิจัยตรวจจับเซลล์เม็ดเลือดที่ปรับโครงสร้างใหม่ ต่อยอดจาก proof of concept บนชุดข้อมูล BCCD

## Proof of concept: YOLO เทียบกับ Faster R-CNN บน BCCD

ฉันเปรียบเทียบ YOLO 12 checkpoint (YOLO26m, YOLO11m, YOLOv8m และ YOLOv8l) กับ Faster R-CNN (ResNet-50-FPN) ที่ fine-tune แล้ว สำหรับการตรวจจับเซลล์เม็ดเลือด 3 คลาส ได้แก่ เม็ดเลือดแดง เม็ดเลือดขาว และเกล็ดเลือด

YOLO26m ให้ผลดีที่สุด ได้ **89.2% mAP50** และ **83.9% F1** บนชุดทดสอบที่แยกไว้ สูงกว่า Faster R-CNN 6.9 คะแนน F1

ฉันสร้างการประเมินผลเป็น pipeline บรรทัดคำสั่ง Python ที่ทำซ้ำได้ ออกรายงานจัดอันดับ วิเคราะห์ generalization gap และทดลองปรับ score/NMS threshold และพบว่า false positive ส่วนใหญ่มาจากความไม่สมดุลของคลาส (เม็ดเลือดแดงคิดเป็น 85% ของ label) ซึ่งเป็นข้อมูลสำหรับขั้นต่อไปเรื่อง latency และจุดทำงาน FP/FN

[โค้ด proof of concept บน GitHub ↗](https://github.com/popongfm/Blood-Cell-Detection)
