# 1. แนวคิด Nest, โครงสร้างโปรเจกต์นี้ และเครื่องมือหลัก

## NestJS คืออะไร

**NestJS** เป็นเฟรมเวิร์กสำหรับเขียน **เซิร์ฟเวอร์ Node.js** โดยใช้ **TypeScript** เป็นหลัก ออกแบบมาให้โค้ดแยกเป็นชั้น ๆ ชัดเจน คล้ายแนวคิดจาก Angular (โมดูล, dependency injection, decorator)

**หัวใจของการเขียนเซิร์ฟเวอร์แบบ Nest**

1. **แยกความรับผิดชอบ (Separation of concerns)**  
   - รับ HTTP อยู่ที่ **Controller**  
   - ธุรกิจ/กฎอยู่ที่ **Service**  
   - เชื่อมฐานข้อมูลผ่าน **Repository / ORM**  
   - ความปลอดภัยอยู่ที่ **Guard / Strategy**

2. **Dependency Injection (DI)**  
   คลาสไม่สร้าง dependency เองทั้งหมด แต่ **ประกาศใน constructor** แล้วให้ Nest **ส่ง (inject)** มาให้ ทำให้ทดสอบและเปลี่ยน implementation ได้ง่าย

3. **โมดูล (Module)**  
   รวม Controller, Service, import จากโมดูลอื่น เป็นหน่วยที่ Nest ใช้จัดการ lifecycle และขอบเขตของ provider

4. **Decorator**  
   เช่น `@Controller()`, `@Get()`, `@Injectable()`, `@UseGuards()` — ใช้บอกบทบาทของคลาส/เมธอดแก่ Nest

## โครงสร้างโปรเจกต์นี้เป็นแบบไหน

โครงสร้างหลักเป็น **Modular Monolith** (แอปเดียว แต่แบ่งเป็นโมดูลตามโดเมน):

| โฟลเดอร์ / ส่วน | หน้าที่ |
|-----------------|--------|
| `src/main.ts` | จุดเริ่มรัน: สร้าง `NestFactory`, ใส่ middleware (session, cookie), `ValidationPipe`, CORS |
| `src/app.module.ts` | รากของแอป: โหลด Config, TypeORM, ลงทะเบียนโมดูลย่อย, ตั้ง **Global JwtAuthGuard** |
| `src/config/` | ตรวจค่า environment (Joi), ฟังก์ชันช่วย normalize ค่าจาก `.env` |
| `src/entities/` | นิยามตารางฐานข้อมูลแบบ TypeORM Entity |
| `src/common/` | ของกลาง: Guard (`JwtAuthGuard`, `RolesGuard`), Decorator (`@Public`, `@Roles`) |
| `src/auth/` | สมัคร/ล็อกอิน, JWT, Passport JwtStrategy |
| `src/users/` | จัดการข้อมูลผู้ใช้ในฐานข้อมูล |
| `src/books/` | หนังสือ (รายการ, CRUD สำหรับ admin) |
| `src/cart/` | ตะกร้าใน **session** |
| `src/orders/` | คำสั่งซื้อ, เช็คเอาต์, ทรานแซกชัน |
| `src/types/` | ขยาย type ของ Express / session (เช่น `session.userId`, `session.cart`) |

**แนวคิดการไหลของคำขอ (Request flow)**

```
Client (HTTP)
  → Express (middleware: cookie-parser, express-session)
  → Nest (Guards → Interceptors → Pipes → Controller)
  → Service
  → TypeORM / DB / Session store
```

## เขียน API ใน Nest อย่างไร

- **Controller** กำหนด **path** และ **HTTP method** (`@Get`, `@Post`, …)  
- **DTO** (class พร้อม `class-validator`) ใช้รับ body/query — ผ่าน **ValidationPipe** แบบ global ใน `main.ts`  
- **Service** รับ logic ธุรกิจ  
- **Guard** ตัดสินใจว่า “ให้ผ่านหรือไม่” ก่อนเข้า handler (เช่น ต้องมี JWT หรือไม่)  
- **Module** ประกาศว่า Controller/Service ไหนอยู่โมดูลไหน และ import โมดูลอื่นอย่างไร

## เครื่องมือหลักที่โปรเจกต์นี้ใช้

| เครื่องมือ | ใช้ทำอะไร |
|------------|-----------|
| **@nestjs/core / common / platform-express** | เฟรมเวิร์ก Nest บน Express |
| **@nestjs/config** | โหลด `.env` และ inject `ConfigService` |
| **TypeORM** + **pg** | ORM เชื่อม **PostgreSQL** |
| **@nestjs/jwt** | สร้าง/ตรวจ JWT |
| **@nestjs/passport** + **passport-jwt** | กลไก Strategy สำหรับ Bearer token |
| **bcrypt** | hash รหัสผ่าน |
| **class-validator / class-transformer** | ตรวจและแปลง DTO |
| **express-session** | session ฝั่งเซิร์ฟเวอร์ |
| **connect-pg-simple** | เก็บ session ใน **ตาราง PostgreSQL** |
| **cookie-parser** | แยก cookie จากคำขอ |
| **joi** | ตรวจความถูกต้องของตัวแปร environment ตอนสตาร์ทแอป |

เมื่อเข้าใจกรอบนี้แล้ว ไปอ่าน **ข้อ 2** (`02-main-bootstrap-and-global-setup.md`) เพื่อดูว่าแอปถูก “สตาร์ท” และ middleware ถูกใส่ลำดับอย่างไร
