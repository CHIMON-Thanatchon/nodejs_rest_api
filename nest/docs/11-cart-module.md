# 11. Cart Module — ตะกร้าใน Session

ไฟล์: `src/cart/`

## แนวคิด

ตะกร้าไม่ได้เก็บเป็นตารางแยกในโปรเจกต์นี้ แต่เก็บใน **`req.session.cart`** เป็น object `{ [bookId]: จำนวน }`

- เหมาะกับ **งานค้าง** ของผู้ใช้แขกหรือสมาชิกก่อน checkout  
- ข้อมูลตาม **session id** (cookie `sid`) — สลับเครื่อง/ล้าง cookie จะได้ตะกร้าใหม่

## Endpoints (ทั้งหมด `@Public()`)

- `GET /cart` — ดูตะกร้า  
- `POST /cart/items` — เพิ่มจำนวน (บวกของเดิม)  
- `PATCH /cart/items/:bookId` — ตั้งจำนวน (0 คือลบรายการ)  
- `DELETE /cart/items/:bookId` — ลบรายการ  
- `DELETE /cart` — ล้างทั้งตะกร้า

## CartService

- เรียก `BooksService.findOne` เพื่อตรวจว่ามีหนังสือจริง  
- หลังแก้ session เรียก `req.session.save()` เพื่อ persist ลง store

`CartModule` **export** `CartService` ให้ `OrdersModule` ใช้ตอน checkout

ต่อไปอ่าน **ข้อ 12** — OrdersModule (จุดสิ้นสุด flow การสั่งซื้อ)
