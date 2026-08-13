import { Task } from '../../task/entities/task.entity';
import { TOTAL_ITEMS_PER_PAGE } from '../constants';
import { PageOptionsDto } from './page-options.dto';

describe('PageOptionsDto', () => {
  it('should fall back to the default page size when take is missing', () => {
    const pageOptionsDto = new PageOptionsDto<Task>({});

    expect(pageOptionsDto.take).toBe(TOTAL_ITEMS_PER_PAGE);
  });

  it('should keep the page size when take is given', () => {
    const pageOptionsDto = new PageOptionsDto<Task>({ take: 10 });

    expect(pageOptionsDto.take).toBe(10);
  });

  it('should start at offset zero when skip is missing', () => {
    const pageOptionsDto = new PageOptionsDto<Task>({});

    expect(pageOptionsDto.skip).toBe(0);
  });

  it('should turn skip into an offset based on the page size', () => {
    const pageOptionsDto = new PageOptionsDto<Task>({ take: 10, skip: 3 });

    expect(pageOptionsDto.skip).toBe(20);
  });

  it('should carry order and where through untouched', () => {
    const order = { title: 'ASC' } as const;
    const where = { title: 'test' };
    const pageOptionsDto = new PageOptionsDto<Task>({ order, where });

    expect(pageOptionsDto.order).toBe(order);
    expect(pageOptionsDto.where).toBe(where);
  });
});
