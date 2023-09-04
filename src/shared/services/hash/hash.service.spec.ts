import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';
import * as bcrypt from 'bcrypt';

describe('HashService', () => {
  let hashService: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    hashService = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(hashService).toBeDefined();
  });

  describe('hash', () => {
    it('should hash a string using bcrypt', async () => {
      const stringItem = 'password';
      const expectedHashedString = 'hashedString';

      jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => 'salt');
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => expectedHashedString);

      const actualHashedString = await hashService.hash(stringItem);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(hashService.SALT_ROUNDS);
      expect(bcrypt.hash).toHaveBeenCalledWith(stringItem, 'salt');
      expect(actualHashedString).toBe(expectedHashedString);
    });
  });

  describe('compare', () => {
    it('should compare a hashed string with a plain string item', async () => {
      const hashedString = 'hashedString';
      const plainString = 'password';
      const expectedResult = true;

      jest.spyOn(bcrypt, 'compare').mockImplementation(() => expectedResult);

      const actualResult = await hashService.compare(hashedString, plainString);

      expect(bcrypt.compare).toHaveBeenCalledWith(plainString, hashedString);
      expect(actualResult).toBe(expectedResult);
    });

    it('should return false for non-matching strings', async () => {
      const hashedString = 'hashedString';
      const plainString = 'wrongPassword';
      const expectedResult = false;

      jest.spyOn(bcrypt, 'compare').mockImplementation(() => expectedResult);

      const actualResult = await hashService.compare(hashedString, plainString);

      expect(bcrypt.compare).toHaveBeenCalledWith(plainString, hashedString);
      expect(actualResult).toBe(expectedResult);
    });
  });
});
