import { RegisterDto } from '../auth/dto/register.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtPayload } from './types';
import { ConfigService } from '@nestjs/config';

const ACCESS_TOKEN_COOKIE_KEY = 'accessToken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const user: JwtPayload = req.user;
    const { accessToken } = await this.authService.login(user);
    res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
    });

    return { message: 'Login successful', status: HttpStatus.OK, accessToken };
  }

  @Public()
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
