import { FindManyOptions } from 'typeorm';

export interface PageMetaDtoParameters<T> {
  pageOptions: FindManyOptions<T>;
  items_count: number;
}
