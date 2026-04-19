# 7. Auth Module — JWT, Passport และ Session หลังล็อกอิน

ไฟล์หลัก: `src/auth/`

## องค์ประกอบ

| ส่วน | หน้าที่ |
|------|---------|
| `auth.controller.ts` | HTTP: register, login, logout, me |
| `auth.service.ts` | hash รหัสผ่าน, ออก JWT, ตั้ง/ล้าง session, อ่านโปรไฟล์จาก JWT หรือ session |
| `jwt.strategy.ts` | Passport: อ่าน Bearer token, ตรวจ signature, โหลด user จาก DB |
| `auth.module.ts` | รวม `UsersModule`, `JwtModule`, `PassportModule` |

## Register

- ตรวจว่า email ไม่ซ้ำ  
- `bcrypt.hash` รหัสผ่าน  
- บันทึก `User` เป็นบทบาท `customer`

## Login

- ตรวจรหัสผ่านด้วย `bcrypt.compare`  
- ตั้ง `req.session.userId` แล้ว `session.save()` — **จำสถานะล็อกอินผ่าน cookie**  
- สร้าง **JWT** (`accessToken`) สำหรับ client ที่ต้องการเรียก API แบบ stateless (header `Authorization`)

## Logout

- `req.session.destroy()` — ลบ session ใน store และ cookie ตามการตั้งค่า

## GET /auth/me

รองรับสองทาง (ลำดับในบริการ):

1. มี `Authorization: Bearer <token>` — ตรวจ JWT แล้วคืนข้อมูล user  
2. ไม่มี token แต่มี session ที่มี `userId` — คืนข้อมูลจาก session (**source จะเป็น `session`**)

ช่วยให้ “รู้ว่าคนเดิมล็อกอินอยู่” ได้แม้ไม่ส่ง Bearer ทุกครั้ง (ถ้า client ส่ง cookie)

## JWT Strategy

- `ExtractJwt.fromAuthHeaderAsBearerToken()`  
- `secretOrKey` จาก `JWT_SECRET`  
- `validate()` คืน `{ id, email, role }` เป็น `req.user` สำหรับ route ที่ผ่าน guard

ต่อไปอ่าน **ข้อ 8** — Guard และ decorator ว่าคุมสิทธิ์อย่างไร
