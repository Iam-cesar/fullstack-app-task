import { PageLinkFactory } from '../factories/page-link.factory';
import { PageMetaFactory } from '../factories/page-meta.factory';

export class PageDto<T> {
  readonly meta: PageMetaFactory<T>;
  readonly data: T[];
  readonly links: PageLinkFactory<T>;

  constructor(data: T[], meta: PageMetaFactory<T>, links: PageLinkFactory<T>) {
    this.meta = meta;
    this.data = data;
    this.links = links;
  }
}
