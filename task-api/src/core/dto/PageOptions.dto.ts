import { FindManyOptions, FindOptionsOrder, FindOptionsWhere } from 'typeorm';

export class PageOptionsDto<T> implements FindManyOptions<T> {
  readonly skip?: number;
  readonly take?: number;
  readonly order?: FindOptionsOrder<T>;
  readonly where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];

  constructor(params?: FindManyOptions<T>) {
    this.take = params.take ? params.take : 15;
    this.skip = (params.skip - 1) * this.take;
    this.order = params.order;
    this.where = params.where;
  }
}
