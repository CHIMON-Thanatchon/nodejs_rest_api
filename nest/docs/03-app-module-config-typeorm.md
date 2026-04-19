# 3. AppModule — Config, TypeORM และ Global Guard

ไฟล์: `src/app.module.ts`

## ConfigModule

- `ConfigModule.forRoot({ isGlobal: true, validationSchema, validationOptions })`  
  - โหลด `.env`  
  - ใช้ **Joi** (`validationSchema` ใน `src/config/env.validation.ts`) ตรวจว่ามีตัวแปรที่จำเป็น  
  - `isGlobal: true` — โมดูลอื่น inject `ConfigService` ได้โดยไม่ต้อง import `ConfigModule` ซ้ำในแต่ละโมดูล

## TypeORM

- `TypeOrmModule.forRootAsync({ useFactory })`  
  - อ่าน host, port, user, password, database จาก `ConfigService`  
  - ใช้ `normalizeEnvValue()` จาก `src/config/env.util.ts` จัดการค่าที่มี quote/ช่องว่าง  
  - `entities: [User, Book, Order, OrderItem]` — ลงทะเบียน entity ชัด ๆ  
  - `synchronize` — ใน development เปิด sync schema อัตโนมัติ (**production ควรปิดและใช้ migration**)  
  - `logging` — log SQL ใน development

## โมดูลโดเมน

ลำดับ import ไม่ได้บังคับลำดับการรันคำขอ แต่สะท้อนการแบ่งโค้ด:

- `UsersModule` → export `UsersService`  
- `AuthModule` → ใช้ `UsersModule`, ลงทะเบียน JWT + Passport  
- `BooksModule`, `CartModule`, `OrdersModule` → ฟีเจอร์ร้านหนังสือ

## Global JwtAuthGuard

```text
{ provide: APP_GUARD, useClass: JwtAuthGuard }
```

- **ทุก route ต้องมี JWT โดยค่าเริ่ม**  
- route ที่ **ไม่** ต้องการ JWT ต้องใส่ **`@Public()`** (ดูเอกสารข้อ 8)

สรุป: `AppModule` คือ “แผนผังราก” ของแอป — ต่อไปอ่าน **ข้อ 4** เรื่องการตรวจ environment แบบละเอียด
