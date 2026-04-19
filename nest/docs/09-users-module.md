# 9. Users Module — การเข้าถึงข้อมูลผู้ใช้

ไฟล์: `src/users/users.module.ts`, `src/users/users.service.ts`

## บทบาท

- **ไม่มี Controller** ของตัวเองในโปรเจกต์นี้ — เปิดเฉพาะ **Service** ให้ `AuthModule` และที่อื่นเรียกใช้  
- รวม `TypeOrmModule.forFeature([User])` เพื่อ inject `Repository<User>`

## UsersService ทำอะไรบ้าง

- `findByEmail` / `findById` — ใช้ตอนล็อกอินและใน JwtStrategy  
- `create` — สร้างผู้ใช้ใหม่ (ถูกเรียกจาก `AuthService.register`)  
- `getByIdOrThrow` — ใช้เมื่อต้องการ error 404 ชัดเจน

## แนวคิด DI

`UsersModule` **export** `UsersService` → `AuthModule` import `UsersModule` แล้ว inject `UsersService` ใน `AuthService` / `JwtStrategy` ได้

ต่อไปอ่าน **ข้อ 10** — BooksModule
