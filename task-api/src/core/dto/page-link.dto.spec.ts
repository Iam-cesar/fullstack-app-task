import { Request } from 'express';
import { Task } from '../../task/entities/task.entity';
import { PageLinkDto } from './page-link.dto';
import { PageMetaDto } from './page-meta.dto';

const req = {
  protocol: 'http',
  baseUrl: '/task',
  get: () => 'localhost:3000',
} as unknown as Request;

const buildMeta = (skip: number, take: number, items_count: number) =>
  new PageMetaDto<Task>({ items_count, pageOptions: { skip, take } });

describe('PageLinkDto', () => {
  it('should point first and last page at the edges of the range', () => {
    const pageLinkDto = new PageLinkDto(buildMeta(1, 10, 100), req);

    expect(pageLinkDto.first_page).toBe(
      'http://localhost:3000/task?page=1&perPage=10',
    );
    expect(pageLinkDto.last_page).toBe(
      'http://localhost:3000/task?page=10&perPage=10',
    );
  });

  it('should leave the previous link empty on the first page', () => {
    const pageLinkDto = new PageLinkDto(buildMeta(1, 10, 100), req);

    expect(pageLinkDto.previous_page_link).toBe('');
    expect(pageLinkDto.next_page_link).toBe(
      'http://localhost:3000/task?page=2&perPage=10',
    );
  });

  it('should give both links on a middle page', () => {
    const pageLinkDto = new PageLinkDto(buildMeta(3, 10, 100), req);

    expect(pageLinkDto.previous_page_link).toBe(
      'http://localhost:3000/task?page=2&perPage=10',
    );
    expect(pageLinkDto.next_page_link).toBe(
      'http://localhost:3000/task?page=4&perPage=10',
    );
  });

  it('should leave the next link empty on the last page', () => {
    const pageLinkDto = new PageLinkDto(buildMeta(10, 10, 100), req);

    expect(pageLinkDto.previous_page_link).toBe(
      'http://localhost:3000/task?page=9&perPage=10',
    );
    expect(pageLinkDto.next_page_link).toBe('');
  });
});
