import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const mockUserRepository = {
  findOneBy: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null when findByUsername is called with an invalid username', async () => {
    const username = 'non_existent_user';

    mockUserRepository.findOneBy.mockResolvedValue(null);

    const result = await service.findByUsername(username);

    expect(result).toBeNull();
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ username });
  });

  it('should throw a ConflictException if the username already exists', async () => {
    const registerDto = {
      name: 'testuser',
      username: 'existinguser',
      password: 'testpassword',
    };

    jest
      .spyOn(service, 'findByUsername')
      .mockReturnValue({ username: 'existinguser' } as any);

    await expect(service.register(registerDto)).rejects.toThrow(
      ConflictException,
    );
  });
});
