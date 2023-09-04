import { BaseEntity } from 'src/shared/entities/base.entity';
import { DeepPartial, Repository } from 'typeorm';

export abstract class BaseSeeder<T extends BaseEntity> {
  private _items: DeepPartial<T>[];
  constructor(
    public readonly repo: Repository<T>,
    public items: DeepPartial<T>[],
  ) {
    this._items = items;
  }

  async seed() {
    const isNotEmpty = !!(await this.repo.find({ take: 1 }))[0];

    if (isNotEmpty) return;

    const createdItems = this.repo.create(this._items);
    await this.repo.save(createdItems);

    return;
  }
}
