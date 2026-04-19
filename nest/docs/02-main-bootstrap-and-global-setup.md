# 2. main.ts — Bootstrap และการตั้งค่าแบบ Global

ไฟล์: `src/main.ts`

## ลำดับการทำงาน (สำคัญมาก)

1. **`NestFactory.create(AppModule)`**  
   สร้างอินสแตนซ์แอป Nest โหลด `AppModule` และ dependency ทั้งหมดที่โมดูลนี้ import

2. **`ConfigService`**  
   ดึงค่าจาก environment (หลังผ่าน validation ใน `AppModule`) ใช้สร้าง **Pool** ของ `pg` ให้กับ session store

3. **`cookieParser()`**  
   แปลง header `Cookie` ให้เป็น object ที่อ่านง่าย — ควรอยู่ **ก่อน** session ที่อ่าน cookie ชื่อ `sid`

4. **`session({ ... })`**  
   ใช้ `connect-pg-simple` เก็บ session ใน PostgreSQL ตาราง `user_sessions`  
   - `saveUninitialized: true` — สร้าง session ได้แม้ยังไม่มีข้อมูล (เหมาะกับตะกร้าแขก)  
   - `cookie.name: 'sid'` — ชื่อ cookie ที่เบราว์เซอร์เก็บ

5. **`ValidationPipe` (global)**  
   - `whitelist: true` — ตัด property ที่ไม่มีใน DTO  
   - `transform: true` — แปลง payload เป็นชนิดของ DTO  
   - `forbidNonWhitelisted: true` — ส่ง property แปลก ๆ แล้ว error

6. **`enableCors`**  
   `credentials: true` — ให้เบราว์เซอร์ส่ง cookie ข้าม origin ได้เมื่อ frontend อยู่คนละโดเมน (ต้องตั้ง `origin` ให้เหมาะสมใน production)

7. **`listen(PORT)`**  
   เปิดพอร์ตรับ HTTP

## หัวใจที่ต้องจำ

- **Middleware ของ Express รันตามลำดับที่ `app.use()`** — cookie ก่อน session  
- **Pipe แบบ global** ใช้กับ body/query ของทุก route ที่มี DTO  
- Session ในโปรเจกต์นี้ **ไม่ใช่แค่ memory** แต่ **เขียนลง PostgreSQL** ผ่าน `connect-pg-simple`

ต่อไปอ่าน **ข้อ 3** — `app.module.ts` ว่าโมดูลและ TypeORM ถูกประกอบอย่างไร
