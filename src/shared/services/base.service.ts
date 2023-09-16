import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class BaseService<Entity> {
  constructor(public repo: Repository<Entity>) {}

  async create(createDTO: any) {
    const element = await this.repo.save(createDTO);
    return this.findOne(element.id);
  }

  /**
   * Creates a new entity using the provided EntityManager.
   * It is very useful for creating entities in a transaction context
   *
   *
   * @param {any} createDTO - The data object used to create the entity.
   * @param {EntityManager} entityManager - The EntityManager used to create the entity.
   * @return {Promise<Entity>} A promise that resolves to the created entity.
   */
  async createWithEntityManager(
    createDTO: any,
    entityManager: EntityManager,
  ): Promise<Entity> {
    const element = entityManager.create(this.repo.metadata.name, createDTO);
    return await entityManager.save(element);
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

  async updateWithEntityManager(
    id: number,
    updateDTO: any,
    entityManager: EntityManager,
  ) {
    //@ts-expect-error
    const element = await this.repo.findOneBy({ id });
    if (!element) throw new NotFoundException();
    // await this.repo.merge(element, updateDTO);
    Object.keys(updateDTO).forEach((key) => {
      element[key] = updateDTO[key];
    });
    await entityManager.save(element);
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
