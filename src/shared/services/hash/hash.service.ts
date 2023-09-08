import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Hashes service allows for convenient hashing of a string.
 * The service is created to provide flexibility in changing hashing configurations.
 * By centralizing the hashing logic in one place, future changes, such as switching from bcrypt to scrypt,
 * can be made easily without modifying multiple parts of the codebase.
 */

@Injectable()
export class HashService {
  SALT_ROUNDS = 12;

  /**
   * Hashes a string using bcrypt.
   * @param {string} stringItem - The string to be hashed.
   * @returns {Promise<string>} - The hashed string.
   */
  public async hash(stringItem: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    const hashedString = await bcrypt.hash(stringItem, salt);
    console.log('hashedString: ', hashedString);
    return hashedString;
  }

  /**
   * Compare a hashed string with a plain string item.
   * @param hashedString - The hashed string to compare.
   * @param stringItem - The plain string item to compare.
   * @returns A promise that resolves to a boolean indicating whether the strings match.
   */
  public async compare(
    stringItem: string,
    hashedString: string,
  ): Promise<boolean> {
    if (!stringItem || !hashedString)
      throw new UnprocessableEntityException(
        'Please provide valid arguments to compare',
      );
    return await bcrypt.compare(stringItem, hashedString);
  }
}
