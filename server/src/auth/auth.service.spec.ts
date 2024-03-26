import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            register: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should call usersService.register with the correct argument', async () => {
    const registerDto: RegisterDto = {
      name: 'Test User',
      username: 'test_user',
      password: 'password',
    };

    await service.register(registerDto);

    expect(usersService.register).toHaveBeenCalledWith(registerDto);
  });
});
