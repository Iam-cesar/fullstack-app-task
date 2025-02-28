import { PageLinkDto } from './page-link.dto';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  readonly meta: PageMetaDto<T>;
  readonly data: T[];
  readonly links: PageLinkDto<T>;

  constructor(data: T[], meta: PageMetaDto<T>, links: PageLinkDto<T>) {
    this.meta = meta;
    this.data = data;
    this.links = links;
  }
}
