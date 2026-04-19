import { Body, Controller, Get, Headers, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.login(dto, req);
  }

  @Public()
  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }

  /** ตรวจว่าเป็นผู้ใช้คนเดิมที่ล็อกอินอยู่หรือไม่: ส่ง Cookie หรือ Authorization: Bearer */
  @Public()
  @Get('me')
  me(
    @Req() req: Request,
    @Headers('authorization') authorization?: string,
  ) {
    return this.authService.getMe(req, authorization);
  }
}
