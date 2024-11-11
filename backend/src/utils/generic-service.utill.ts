import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from "typeorm";

export class GenericService<T extends ObjectLiteral> {
  constructor(private readonly entity: Repository<T>) {}

  save(createDto: any): Promise<T> {
    return this.entity.save(createDto);
  }

  async upsert(createDto: Partial<T>): Promise<T> {
    await this.entity.upsert(createDto, ["id"]);
    return this.entity.findOneByOrFail({ id: createDto.id });
  }

  count(options: FindManyOptions<T>): Promise<number> {
    return this.entity.count(options);
  }

  findAll(options: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOneOrFail(options);
  }

  update(options: FindOptionsWhere<T>, updateDto: any): Promise<UpdateResult> {
    return this.entity.update(options, updateDto);
  }

  remove(options: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.entity.delete(options);
  }

  softDelete(options: FindOptionsWhere<T>): Promise<UpdateResult> {
    return this.entity.softDelete(options);
  }
}
