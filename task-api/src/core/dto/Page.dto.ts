import { PageMetaDto } from './PageMeta.dto';

export class PageDto<T> {
  readonly meta: PageMetaDto<T>;
  readonly data: T[];

  constructor(data: T[], meta: PageMetaDto<T>) {
    this.meta = meta;
    this.data = data;
  }
}
