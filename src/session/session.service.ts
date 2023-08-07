import { BaseService } from 'src/shared/services/base.service';
import { Session } from './session.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';

export class SessionService {
  private _user: User | null = null;
  private _userId: number | null = null;
  private _businessId: number | null = null;

  set user(user: User) {
    this._user = user;
  }

  set userId(userId: number) {
    this._userId = userId;
  }

  set businessId(businessId: number) {
    this._businessId = businessId;
  }

  get user(): User {
    return this._user;
  }

  get userId(): number {
    return this._userId;
  }

  get businessId(): number {
    return this._businessId;
  }
}
