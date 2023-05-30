import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

@Injectable()
export class BaseService<Entity> {
  constructor(public repo: Repository<Entity>) {}

  async create(createDTO: any) {
    const element = await this.repo.save(createDTO);
    return this.findOne(element.id);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string | Partial<Entity>) {
    const element =
      typeof id === 'string'
        ? //@ts-expect-error
          await this.repo.findOneBy({ id })
        : //@ts-expect-error
          await this.repo.findOneBy(id);

    return element;
  }

  async update(id: string, updateDTO: any) {
    //@ts-expect-error
    const element = await this.repo.findOneBy({ id });
    this.repo.merge(element, updateDTO);
    return this.repo.save(element);
  }

  async remove(id: string) {
    //@ts-expect-error
    const element = await this.repo.findOneBy({ id });
    return this.repo.softRemove(element);
  }

  async findFirst() {
    return (await this.repo.find({ take: 1 }))[0];
  }
}
