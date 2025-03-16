import { PageMetaFactory } from '../factories/page-meta.factory';

interface IPageLinks {
  first_page: string;
  last_page: string;
  previous_page_link: string;
  next_page_link: string;
}

export class PageDto<T> {
  readonly meta: PageMetaFactory<T>;
  readonly data: T[];
  readonly links: IPageLinks;

  constructor(data: T[], meta: PageMetaFactory<T>, links: IPageLinks) {
    this.meta = meta;
    this.links = links;
    this.data = data;
  }
}
