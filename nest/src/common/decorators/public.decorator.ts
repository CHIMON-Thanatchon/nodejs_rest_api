import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/** ข้าม JWT guard (เช่น register, login, รายการหนังสือ) */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
