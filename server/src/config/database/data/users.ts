import { RegisterDto } from '../../../auth/dto/register.dto';

interface IUser extends RegisterDto {}

export const usersData: IUser[] = [
  {
    name: 'takehome',
    username: 'takehome',
    password: '12345678',
  },
];
