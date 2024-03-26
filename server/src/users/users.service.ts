import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterResponseDto } from '../auth/dto/register-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const existsUser = await this.findByUsername(registerDto.username);

    if (existsUser) {
      throw new ConflictException('Username already exist');
    }

    const newUser = this.usersRepository.create(registerDto);
    return this.usersRepository.save(newUser);
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }
}
