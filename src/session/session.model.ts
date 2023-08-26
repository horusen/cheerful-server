import { User } from 'src/users/users.entity';

export interface Session {
  userId: number;
  user: User;
  businessId: number;
}
