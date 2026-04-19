# 12. Orders Module — Checkout, ทรานแซกชัน และประวัติ

ไฟล์: `src/orders/`

## ข้อกำหนด

- **`POST /orders/checkout`** — **ไม่** ใช้ `@Public` → ต้องมี **JWT** (ผูกคำสั่งซื้อกับ `req.user.id`)  
- **`GET /orders/me`** — ดูคำสั่งซื้อของตัวเอง

## Checkout flow (ใน `OrdersService`)

1. ใช้ `CartService.validateNotEmpty` ตรวจว่าตะกร้าไม่ว่าง  
2. เปิด **ทรานแซกชัน** ด้วย `DataSource.transaction`  
3. วนรายการในตะกร้า: โหลด `Book`, ตรวจสต็อก, สะสมยอดรวม  
4. สร้าง `Order` และ `OrderItem`  
5. `decrement` สต็อกหนังสือ  
6. หลัง commit สำเร็จ — `CartService.clear` ล้างตะกร้าใน session  
7. คืน order พร้อม `items` และ `items.book`

## หัวใจของ “ความถูกต้องของข้อมูล”

- การสร้าง order + ลดสต็อกอยู่ใน **transaction** เดียวกัน — ถ้าขั้นตอนใดล้ม จะ rollback  
- การล้างตะกร้าทำ **หลัง** transaction สำเร็จ — ไม่ล้างตะกร้าถ้าสั่งซื้อไม่สำเร็จ

---

## จบลำดับเอกสาร

คุณได้ไล่ตาม flow จาก **bootstrap → config → DB → session → auth → guard → โดเมน** ครบแล้ว  
หากจะขยายระบบจริง: ปิด `synchronize`, เพิ่ม **migration**, ปรับ CORS ให้จำกัด origin, และพิจารณา refresh token / rate limit ตามความต้องการ
