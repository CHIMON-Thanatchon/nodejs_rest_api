# 10. Books Module — รายการหนังสือและสิทธิ์ Admin

ไฟล์: `src/books/`

## Controller

- `GET /books`, `GET /books/:id` — **`@Public()`** ทุกคนดูได้  
- `POST /books`, `PATCH /books/:id`, `DELETE /books/:id` — ต้อง JWT + **`RolesGuard`** + **`@Roles(UserRole.ADMIN)`**

## Service

- `OnModuleInit` — ถ้ายังไม่มีหนังสือในตาราง จะ **seed** ตัวอย่างสามเล่ม (สำหรับ dev/demo)  
- CRUD มาตรฐาน ตรวจ ISBN ซ้ำ

## DTO

- `CreateBookDto` / `UpdateBookDto` — ผ่าน `ValidationPipe`  
- `UpdateBookDto` ใช้ `PartialType` จาก `@nestjs/mapped-types`

## หมายเหตุเรื่อง Admin

ผู้ใช้ใหม่เป็นสมาชิก `customer` — การได้ `admin` ต้องตั้งในฐานข้อมูล (หรือ flow พิเศษที่คุณเพิ่มภายหลัง)

ต่อไปอ่าน **ข้อ 11** — CartModule
