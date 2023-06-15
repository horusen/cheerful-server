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

  async findOne(id: number | Partial<Entity>) {
    const element =
      typeof id === 'number'
        ? //@ts-expect-error
          await this.repo.findOneBy({ id })
        : //@ts-expect-error
          await this.repo.findOneBy(id);

    if (!element) throw new NotFoundException();

    return element;
  }

  // TODO: Fix this
  async update(id: number, updateDTO: any) {
    //@ts-expect-error
    const element = await this.repo.findOneBy({ id });
    if (!element) throw new NotFoundException();
    // await this.repo.merge(element, updateDTO);
    Object.keys(updateDTO).forEach((key) => {
      element[key] = updateDTO[key];
    });
    await this.repo.save(element);
    //@ts-expect-error
    return await this.repo.findOneBy({ id });
  }

  async remove(id: number) {
    //@ts-expect-error
    const element = await this.repo.findOneBy({ id });
    return await this.repo.softRemove(element);
  }

  async findFirst() {
    return (await this.repo.find({ take: 1 }))[0];
  }
}
