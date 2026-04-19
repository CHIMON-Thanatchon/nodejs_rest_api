# 5. Entities และฐานข้อมูล (TypeORM + PostgreSQL)

ไฟล์: `src/entities/*.entity.ts`

## Entity คืออะไร

**Entity** คือคลาสที่ **แมปกับตาราง** ในฐานข้อมูล — TypeORM ใช้ metadata จาก decorator (`@Entity`, `@Column`, …) สร้าง/อัปเดต schema (เมื่อ `synchronize: true`) และสร้าง query

## ตารางในโปรเจกต์นี้

| Entity | ตาราง | บทบาท |
|--------|-------|--------|
| `User` | `users` | ผู้ใช้, รหัสผ่าน hash, บทบาท `customer` / `admin` |
| `Book` | `books` | หนังสือ ราคา สต็อก ISBN |
| `Order` | `orders` | คำสั่งซื้อ ผูก `userId` สถานะ ยอดรวม |
| `OrderItem` | `order_items` | รายการในคำสั่งซื้อ จำนวน ราคาต่อหน่วย ผูก `book` |

## ความสัมพันธ์ (Relations)

- `User` **1 — N** `Order` (`@OneToMany` / `@ManyToOne`)  
- `Order` **1 — N** `OrderItem` (`cascade` บางส่วนเพื่อสะดวกตอนบันทึก)  
- `OrderItem` **N — 1** `Book`

## หมายเหตุเรื่องเงิน

คอลัมน์ราคาใช้ `decimal` ใน DB และใน TypeScriptเก็บเป็น **string** เพื่อลดปัญหาความคลาดเคลื่อนของ float

## ตาราง session

ตาราง `user_sessions` **ไม่ใช่** TypeORM Entity — สร้างโดย **connect-pg-simple** ตอนรันแอป (`createTableIfMissing: true`)

ต่อไปอ่าน **ข้อ 6** — session และ cookie ทำงานร่วมกันอย่างไร
