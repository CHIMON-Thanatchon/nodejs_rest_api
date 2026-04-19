# 6. Express Session, Cookie และการเก็บ Session ใน PostgreSQL

## Session คืออะไร (ในโปรเจกต์นี้)

**Session** คือข้อมูล “สถานะฝั่งเซิร์ฟเวอร์” ที่ผูกกับผู้ใช้ผ่าน **รหัส session** — รหัสนี้ส่งกลับไปที่ client ผ่าน **cookie** (ชื่อ `sid`)

- ไม่เก็บข้อมูลอ่อนไหวทั้งก้อนใน cookie โดยตรง (ขนาดใหญ่/เสี่ยง)  
- cookie เก็บแค่ **session id** — ข้อมูลจริงอยู่ที่ store

## ทำไมใช้ connect-pg-simple

ค่าเริ่มของ `express-session` มักใช้ **MemoryStore** — พอ restart เซิร์ฟเวอร์ session หาย และ scale หลาย instance ไม่แชร์กัน

**connect-pg-simple** เก็บ session ใน **PostgreSQL** — เหมาะกับโปรเจกต์ที่มี PostgreSQL อยู่แล้ว และต้องการให้ session **อยู่รอดหลัง restart** (และเตรียมพร้อม scale ในอนาคต)

## ข้อมูลที่เก็บใน session (โปรเจกต์นี้)

ขยาย type ใน `src/types/express-session.d.ts`:

- **`userId`** — หลังล็อกอินสำเร็จ ใช้จำว่า “ผู้ใช้คนนี้ล็อกอินอยู่”  
- **`cart`** — ตะกร้า `{ bookId: จำนวน }` แม้ยังไม่ล็อกอิน (แขก)

## Cookie กับ CORS

ถ้ามี frontend คนละ origin ต้องส่งคำขอพร้อม `credentials: 'include'` และตั้ง CORS ฝั่ง Nest ให้ `credentials: true` (มีใน `main.ts`)

ต่อไปอ่าน **ข้อ 7** — Auth: JWT + Passport + การล็อกอิน
