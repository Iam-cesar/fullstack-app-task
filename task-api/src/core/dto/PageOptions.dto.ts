import { FindManyOptions, FindOptionsOrder, FindOptionsWhere } from 'typeorm';

export class PageOptionsDto<T> implements FindManyOptions<T> {
  readonly skip?: number;
  readonly take?: number;
  readonly order?: FindOptionsOrder<T>;
  readonly where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];

  constructor(params?: FindManyOptions<T>) {
    this.take = this.handleTakeParam(params.take);
    this.skip = this.handleSkipParam(params.skip);
    this.order = params.order;
    this.where = params.where;
  }

  private handleTakeParam(take: number | undefined) {
    return take ? take : 15;
  }

  private handleSkipParam(skip: number | undefined) {
    return skip ? (skip - 1) * this.take : 0;
  }
}
