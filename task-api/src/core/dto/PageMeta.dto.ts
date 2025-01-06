import { PageMetaDtoParameters } from './PageMetaParameters.dto';

export class PageMetaDto<T> {
  readonly page: number;
  readonly take: number;
  readonly items_count: number;
  readonly page_count: number;
  readonly has_previous_page: boolean;
  readonly has_next_page: boolean;

  constructor({ pageOptions, items_count }: PageMetaDtoParameters<T>) {
    this.page = pageOptions.skip;
    this.take = pageOptions.take;
    this.items_count = items_count;
    this.page_count = Math.ceil(this.items_count / this.take);
    this.has_previous_page = this.page > 1;
    this.has_next_page = this.page < this.page_count;
  }
}
