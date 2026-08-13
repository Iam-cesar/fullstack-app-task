import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request } from 'express';
import { DataSource, FindOptionsOrder } from 'typeorm';
import { PageDto } from '../../core/dto/page.dto';
import { PageLinkDto } from '../../core/dto/page-link.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';
import { Task } from '../entities/task.entity';
import { FindAllTaskUseCase } from './find-all-task.use-case';

describe('FindAllTaskUseCase', () => {
  let findAllTaskUseCase: FindAllTaskUseCase;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTaskUseCase,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            findAndCount: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue({
              connect: jest.fn(),
              query: jest.fn(),
              release: jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    findAllTaskUseCase = module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(findAllTaskUseCase).toBeDefined();
  });

  it('should return a PageDto with tasks and meta data', async () => {
    const tasks = [new Task(), new Task()];
    const totalItems = 2;
    const params = {};
    const req = {
      protocol: 'http',
      baseUrl: '/task',
      get: () => 'localhost:3000',
    } as unknown as Request;
    const pageMetaDto = new PageMetaDto({
      items_count: totalItems,
      pageOptions: params,
    });
    const pageLinkDto = new PageLinkDto(pageMetaDto, req);

    jest
      .spyOn(dataSource.createQueryRunner(), 'query')
      .mockResolvedValueOnce(tasks)
      .mockResolvedValueOnce([{ count: totalItems }]);

    const result = await findAllTaskUseCase.execute(params, req);

    expect(result).toEqual(new PageDto(tasks, pageMetaDto, pageLinkDto));
  });

  it('should build correct where clause', () => {
    const whereOptions = { title: 'test' };
    const whereClause = findAllTaskUseCase['buildWhereClause'](whereOptions);
    expect(whereClause).toBe('WHERE title LIKE %test%');
  });

  it('should build correct order clause', () => {
    const orderOptions: FindOptionsOrder<Task> | FindOptionsOrder<Task>[] = {
      title: 'ASC',
    };
    const orderClause = findAllTaskUseCase['buildOrderClause'](orderOptions);
    expect(orderClause).toBe('ORDER BY title ASC');
  });

  it('should build correct limit clause', () => {
    const limitOptions = 10;
    const limitClause = findAllTaskUseCase['buildLimitClause'](limitOptions);
    expect(limitClause).toBe('LIMIT 10');
  });

  it('should build correct offset clause', () => {
    const offsetOptions = 5;
    const offsetClause = findAllTaskUseCase['buildOffsetClause'](offsetOptions);
    expect(offsetClause).toBe('OFFSET 5');
  });
});
