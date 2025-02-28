import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';
import { FindOneTaskUseCase } from './find-one-task.use-case';

describe('FindOneTaskUseCase', () => {
  let findOneTaskUseCase: FindOneTaskUseCase;
  let taskRepository: TaskRepository;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneTaskUseCase,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            findOneByOrFail: jest.fn(),
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

    findOneTaskUseCase = module.get<FindOneTaskUseCase>(FindOneTaskUseCase);
    taskRepository = module.get<TaskRepository>(getRepositoryToken(Task));
    dataSource = module.get<DataSource>(DataSource);
    queryRunner = dataSource.createQueryRunner();
  });

  it('should be defined', () => {
    expect(findOneTaskUseCase).toBeDefined();
  });

  it('should return a task when found', async () => {
    const task = new Task();
    task.id = 1;
    jest.spyOn(queryRunner, 'query').mockResolvedValue([task]);

    expect(await findOneTaskUseCase.execute(1)).toBe(task);
  });

  it('should return null when task is not found', async () => {
    jest.spyOn(queryRunner, 'query').mockResolvedValue([]);

    expect(await findOneTaskUseCase.execute(1)).toBeNull();
  });

  it('should throw an error if query fails', async () => {
    jest
      .spyOn(queryRunner, 'query')
      .mockRejectedValue(new Error('Query failed'));

    await expect(findOneTaskUseCase.execute(1)).rejects.toThrow('Query failed');
  });
});
