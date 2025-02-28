import { FindManyOptions, FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { TOTAL_ITEMS_PER_PAGE } from '../constants';

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
    return take ? take : TOTAL_ITEMS_PER_PAGE;
  }

  private handleSkipParam(skip: number | undefined) {
    return skip ? (skip - 1) * this.take : 0;
  }
}
