import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร' })
  password: string;

  @IsOptional()
  @IsString()
  fullName?: string;
}
