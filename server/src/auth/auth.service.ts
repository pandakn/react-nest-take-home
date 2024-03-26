import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';
import { UsersService } from '../users/users.service';
import { LoginResponseDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    return this.usersService.register(registerDto);
  }

  async login(user: JwtPayload): Promise<LoginResponseDto> {
    return {
      name: user.name,
      username: user.username,
      accessToken: this.jwtService.sign(user),
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<JwtPayload | null> {
    const user = await this.usersService.findByUsername(username);

    if (user && (await this.comparePassword(password, user.password))) {
      const { id, name, username } = user;
      const result: JwtPayload = { sub: id, name, username };
      return result;
    }

    return null;
  }

  private async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
