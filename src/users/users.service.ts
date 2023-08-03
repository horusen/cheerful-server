import { User } from './users.entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) public readonly repo: Repository<User>) {
    super(repo);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  /**
   * Finds a user by email and creates an empty user if not found.
   * @param {string} email - The email of the user to create.
   * @returns {Promise<User>} - The created user.
   */
  async findOrCreateUserByEmail(email: string): Promise<User> {
    const existingUser = this.findByEmail(email);

    if (existingUser) {
      return existingUser;
    }

    return this._createEmptyUserByEmail(email);
  }

  /**
   * Creates an empty user using the provided email.
   * @param email - The email of the user.
   * @returns The created user object.
   */
  private async _createEmptyUserByEmail(email: string) {
    // Create a new user object with the provided email
    const user = await this.repo.save({ email });

    //TODO: send email invitation

    // Return the created user object
    return user;
  }
}
