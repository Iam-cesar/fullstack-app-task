import { Request } from 'express';
import { PageMetaDto } from './page-meta.dto';

export class PageLinkDto<T> {
  next_page_link: string;
  previous_page_link: string;

  first_page: string;
  last_page: string;

  constructor(pageMetaDto: PageMetaDto<T>, request: Request) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.baseUrl}`;
    const currentPage = pageMetaDto.page;
    const totalOfPages = Math.ceil(
      pageMetaDto.items_count / pageMetaDto.per_page,
    );

    this.first_page = `${baseUrl}?page=1&perPage=${pageMetaDto.per_page}`;
    this.last_page = `${baseUrl}?page=${totalOfPages}&perPage=${pageMetaDto.per_page}`;

    this.previous_page_link =
      currentPage > 1
        ? `${baseUrl}?page=${currentPage - 1}&perPage=${pageMetaDto.per_page}`
        : '';

    this.next_page_link =
      currentPage < totalOfPages
        ? `${baseUrl}?page=${currentPage + 1}&perPage=${pageMetaDto.per_page}`
        : '';
  }
}
