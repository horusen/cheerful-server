import { TypeUserEnum } from '../src/users/type-users/type-user.enum';
import { User } from '../src/users/users.entity';

export const mockUser = {
  type_user_id: TypeUserEnum.Individual,
  name: 'John Doe',
  phone_number: '+22133484948',
  verified: false,
  point_balance: 20,
  password: 'Password',
  country_id: 1,
} as User;
