# 8. Guards และ Decorators — ใครผ่านได้ ใครต้องมี Token

## JwtAuthGuard (Global)

ไฟล์: `src/common/guards/jwt-auth.guard.ts`

- สืบทอด `AuthGuard('jwt')` ของ Passport  
- อ่าน metadata **`IS_PUBLIC_KEY`** จาก `@Public()`  
- ถ้า route เป็น **public** → **ไม่** บังคับ JWT (คืน `true` ทันที)  
- ถ้าไม่ public → ต้องมี Bearer token ที่ผ่าน `JwtStrategy` → ได้ `req.user`

## @Public()

ไฟล์: `src/common/decorators/public.decorator.ts`

ใช้กับ route ที่ลูกค้าทั่วไปเรียกได้: หน้าแรก, สมัคร, ล็อกอิน, รายการหนังสือ, ตะกร้า ฯลฯ

## RolesGuard + @Roles()

ไฟล์: `src/common/guards/roles.guard.ts`, `src/common/decorators/roles.decorator.ts`

- ใช้กับ route ที่ต้องการบทบาทเฉพาะ (เช่น **admin**)  
- อ่าน `req.user.role` เปรียบเทียบกับรายการใน `@Roles(UserRole.ADMIN)`  
- ต้องมี JWT แล้ว (เพราะไม่ใช่ `@Public`) จึงมี `req.user` จาก JWT

## ลำดับการคิดเมื่อเขียน API ใหม่

1. ต้องการให้ทุกคนเรียกได้ไหม? → ใส่ `@Public()`  
2. ต้องการให้เฉพาะ user ล็อกอิน? → ไม่ใส่ `@Public` (ใช้ JWT จาก global guard)  
3. ต้องการเฉพาะ admin? → เพิ่ม `@UseGuards(RolesGuard)` และ `@Roles(UserRole.ADMIN)`

ต่อไปอ่าน **ข้อ 9** — UsersModule
