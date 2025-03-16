import { PageMetaFactory } from './page-meta.factory';

export class PageLinkFactory<T> {
  public previous_page_link: string;
  public next_page_link: string;
  public first_page: string;
  public last_page: string;

  protected currentPage: number;
  protected totalOfPages: number;

  protected baseUrl: string;
  protected pageMeta: PageMetaFactory<T>;

  constructor(pageMeta: PageMetaFactory<T>, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.pageMeta = pageMeta;

    this.currentPage = pageMeta.page;
    this.totalOfPages = Math.ceil(pageMeta.items_count / pageMeta.per_page);

    this.first_page = this.buildFirstPageLink();
    this.last_page = this.buildLastPageLink();
    this.previous_page_link = this.buildPreviousPageLink();
    this.next_page_link = this.buildNextPageLink();
  }

  private buildFirstPageLink(): string {
    return `${this.baseUrl}?page=1&perPage=${this.pageMeta.per_page}`;
  }

  private buildLastPageLink(): string {
    return `${this.baseUrl}?page=${this.totalOfPages}&perPage=${this.pageMeta.per_page}`;
  }

  private buildPreviousPageLink(): string {
    const hasPreviousPageLink = this.currentPage > 1;
    const previousPageLink = `${this.baseUrl}?page=${this.currentPage - 1}&perPage=${this.pageMeta.per_page}`;
    return hasPreviousPageLink ? previousPageLink : '';
  }

  private buildNextPageLink(): string {
    const hasNextPageLink = this.currentPage < this.totalOfPages;
    const nextPageLink = `${this.baseUrl}?page=${this.currentPage + 1}&perPage=${this.pageMeta.per_page}`;
    return hasNextPageLink ? nextPageLink : '';
  }
}
