import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get(':username')
  // findOne(@Param('username') username: string) {
  //   return this.usersService.findByUsername(username);
  // }
}
