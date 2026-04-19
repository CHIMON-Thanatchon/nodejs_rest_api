# 4. Environment — การตรวจค่าและ env.util

## ไฟล์ที่เกี่ยวข้อง

- `src/config/env.validation.ts` — สคีมา **Joi** สำหรับตัวแปรที่จำเป็น  
- `src/config/env.util.ts` — ฟังก์ชัน `normalizeEnvValue()`  
- `.env` — ค่าจริง (อย่า commit ขึ้น git; โปรเจกต์มี `.gitignore` กัน `.env` แล้ว)

## ทำไมต้อง validate ตอนสตาร์ท

- ถ้าขาด `JWT_SECRET` หรือ `SESSION_SECRET` แอปควรล้มทันที แทนที่จะรันแล้ว error กลางทาง  
- Joi ช่วยแปลงชนิด (เช่น `PORT` เป็นตัวเลข) เมื่อใช้ `validationOptions.convert: true`

## ตัวแปรหลักในโปรเจกต์นี้

| ตัวแปร | ความหมาย |
|--------|----------|
| `DB_*` | เชื่อม PostgreSQL |
| `JWT_SECRET` | ลายเซ็น/ตรวจ JWT |
| `JWT_EXPIRES_IN` | อายุ token (เช่น `7d`) |
| `SESSION_SECRET` | ลงชื่อ cookie session (แยกจาก JWT) |
| `PORT` | พอร์ต HTTP |
| `NODE_ENV` | โหมด `development` / `production` |

## normalizeEnvValue

บางครั้งใน `.env` มีรูปแบบ `KEY = "value"` — ฟังก์ชันนี้ trim และตัด quote รอบค่าให้ค่าที่ส่งเข้า TypeORM/Pool ใช้งานได้สม่ำเสมอ

ต่อไปอ่าน **ข้อ 5** — Entity และความสัมพันธ์ในฐานข้อมูล
