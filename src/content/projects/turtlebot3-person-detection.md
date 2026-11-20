---
title: { en: "TurtleBot3 Person Detection", th: "TurtleBot3 Person Detection" }
summary: { en: "Two ROS 2 nodes giving a robot real-time person detection with YOLO26, tested in Gazebo.", th: "ROS 2 สอง node ที่ทำให้หุ่นยนต์ตรวจจับคนแบบเรียลไทม์ด้วย YOLO26 ทดสอบใน Gazebo" }
constellation: robotics
order: 0
brightness: 3
status: done
role: { en: "Project manager for a team of 3; developed the project concept.", th: "ผู้จัดการโปรเจกต์ของทีม 3 คน และเป็นผู้คิดแนวคิดของโปรเจกต์" }
context: "AIE495 final project"
contextTh: "โปรเจกต์จบวิชา AIE495"
yearTh: "ก.ค. 2026"
year: "Jul 2026"
tools: ["ROS 2 Humble", "Python", "YOLO26", "Gazebo", "TurtleBot3"]
---
Two ROS 2 Humble nodes in Python: one tracks distance from odometry, the other runs YOLO26 on the camera feed and answers a `/detect_person` service with count, position and confidence. Tested in Gazebo simulation.
