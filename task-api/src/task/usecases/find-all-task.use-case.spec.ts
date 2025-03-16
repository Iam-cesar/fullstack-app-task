import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, FindOptionsOrder } from 'typeorm';
import { PageDto } from '../../core/dto/page.dto';
import { BaseUrlFactory } from '../../core/factories/base-url.factory';
import { PageLinkFactory } from '../../core/factories/page-link.factory';
import { PageMetaFactory } from '../../core/factories/page-meta.factory';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';
import { FindAllTaskUseCase } from './find-all-task.use-case';

describe('FindAllTaskUseCase', () => {
  let findAllTaskUseCase: FindAllTaskUseCase;
  let taskRepository: TaskRepository;
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
    taskRepository = module.get<TaskRepository>(getRepositoryToken(Task));
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(findAllTaskUseCase).toBeDefined();
  });

  it('should return a object with tasks and meta data', async () => {
    const tasks = [new Task(), new Task()];
    const totalItems = [{ count: 2 }];
    const params = {};
    const req = {
      get: () => 'testhost',
      protocol: 'https',
      baseUrl: '/baseUrl',
      path: '/test',
    } as any;

    const baseUrl = new BaseUrlFactory(req);

    const pageMetaDto = new PageMetaFactory({
      items_count: totalItems[0].count,
      pageOptions: params,
    });

    const pageLinks = new PageLinkFactory<Task>(
      pageMetaDto,
      baseUrl.link,
    ).getPageLinks();

    jest
      .spyOn(dataSource.createQueryRunner(), 'query')
      .mockResolvedValueOnce(tasks)
      .mockResolvedValueOnce(totalItems);

    const result = await findAllTaskUseCase.execute(params, req);

    expect(result).toEqual(new PageDto(tasks, pageMetaDto, pageLinks));
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
