import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request } from 'express';
import { DataSource, FindOptionsOrder, Like } from 'typeorm';
import { PageDto } from '../../core/dto/page.dto';
import { PageLinkDto } from '../../core/dto/page-link.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';
import { Task } from '../entities/task.entity';
import { FindAllTaskUseCase } from './find-all-task.use-case';

const taskColumns = [
  { propertyName: 'id', databaseName: 'id' },
  { propertyName: 'title', databaseName: 'title' },
  { propertyName: 'description', databaseName: 'description' },
  { propertyName: 'status', databaseName: 'status' },
  { propertyName: 'createdAt', databaseName: 'created_at' },
  { propertyName: 'updatedAt', databaseName: 'updated_at' },
];

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
            getMetadata: jest.fn().mockReturnValue({ columns: taskColumns }),
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
      .mockResolvedValueOnce([{ count: `${totalItems}` }]);

    const result = await findAllTaskUseCase.execute(params, req);

    expect(result).toEqual(new PageDto(tasks, pageMetaDto, pageLinkDto));
  });

  it('should select every column aliased to its entity property name', async () => {
    const req = {
      protocol: 'http',
      baseUrl: '/task',
      get: () => 'localhost:3000',
    } as unknown as Request;
    const query = jest
      .spyOn(dataSource.createQueryRunner(), 'query')
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ count: '0' }]);

    await findAllTaskUseCase.execute({}, req);

    expect(query.mock.calls[0][0]).toContain('created_at AS "createdAt"');
    expect(query.mock.calls[0][0]).toContain('updated_at AS "updatedAt"');
  });

  it('should report items_count as a number', async () => {
    const req = {
      protocol: 'http',
      baseUrl: '/task',
      get: () => 'localhost:3000',
    } as unknown as Request;
    jest
      .spyOn(dataSource.createQueryRunner(), 'query')
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ count: '7' }]);

    const result = await findAllTaskUseCase.execute({}, req);

    expect(result.meta.items_count).toBe(7);
  });

  it('should build a parameterized where clause', () => {
    const queryParams: unknown[] = [];
    const whereOptions = { title: Like('%test%') };
    const whereClause = findAllTaskUseCase['buildWhereClause'](
      whereOptions,
      queryParams,
    );

    expect(whereClause).toBe('WHERE title LIKE $1');
    expect(queryParams).toEqual(['%test%']);
  });

  it('should not interpolate the search value into the sql', () => {
    const queryParams: unknown[] = [];
    const injection = "%'; DROP TABLE task; --";
    const whereClause = findAllTaskUseCase['buildWhereClause'](
      { title: Like(injection) },
      queryParams,
    );

    expect(whereClause).toBe('WHERE title LIKE $1');
    expect(whereClause).not.toContain('DROP TABLE');
    expect(queryParams).toEqual([injection]);
  });

  it('should ignore where keys that are not entity columns', () => {
    const queryParams: unknown[] = [];
    const whereClause = findAllTaskUseCase['buildWhereClause'](
      { 'title; DROP TABLE task; --': 'x' } as never,
      queryParams,
    );

    expect(whereClause).toBe('');
    expect(queryParams).toEqual([]);
  });

  it('should build correct order clause', () => {
    const orderOptions: FindOptionsOrder<Task> | FindOptionsOrder<Task>[] = {
      title: 'ASC',
    };
    const orderClause = findAllTaskUseCase['buildOrderClause'](orderOptions);
    expect(orderClause).toBe('ORDER BY title ASC');
  });

  it('should map the order clause key to its column name', () => {
    const orderClause = findAllTaskUseCase['buildOrderClause']({
      createdAt: 'DESC',
    });
    expect(orderClause).toBe('ORDER BY created_at DESC');
  });

  it('should reject an order direction that is not ASC or DESC', () => {
    const orderClause = findAllTaskUseCase['buildOrderClause']({
      title: 'ASC; DROP TABLE task; --',
    } as never);

    expect(orderClause).toBe('ORDER BY title ASC');
    expect(orderClause).not.toContain('DROP TABLE');
  });

  it('should ignore order keys that are not entity columns', () => {
    const orderClause = findAllTaskUseCase['buildOrderClause']({
      'title; DROP TABLE task; --': 'ASC',
    } as never);

    expect(orderClause).toBe('');
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
