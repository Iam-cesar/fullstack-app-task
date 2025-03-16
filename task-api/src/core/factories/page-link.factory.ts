import { PageMetaFactory } from './page-meta.factory';

export class PageLinkFactory<T> {
  private previous_page_link: string;
  private next_page_link: string;
  private first_page: string;
  private last_page: string;

  protected currentPage: number;
  protected totalOfPages: number;

  private readonly baseUrl: string;
  private readonly pageMeta: PageMetaFactory<T>;

  constructor(pageMeta: PageMetaFactory<T>, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.pageMeta = pageMeta;

    this.currentPage = pageMeta.page;
    this.totalOfPages = Math.ceil(pageMeta.items_count / pageMeta.per_page);
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

  public getPageLinks() {
    return {
      first_page: this.buildFirstPageLink(),
      last_page: this.buildLastPageLink(),
      previous_page_link: this.buildPreviousPageLink(),
      next_page_link: this.buildNextPageLink(),
    };
  }
}
