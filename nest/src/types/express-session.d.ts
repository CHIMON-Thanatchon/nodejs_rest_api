import 'express-session';

declare module 'express-session' {
  interface SessionData {
    /** ผูกกับผู้ใช้หลังล็อกอิน (จำสถานะล็อกอินผ่าน cookie session) */
    userId?: string;
    /** ตะกร้าแขก/สมาชิก: bookId -> จำนวน */
    cart?: Record<string, number>;
  }
}
