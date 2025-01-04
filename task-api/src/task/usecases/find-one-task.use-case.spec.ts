import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';
import { FindOneTaskUseCase } from './find-one-task.use-case';

describe('FindOneTaskUseCase', () => {
  let findOneTaskUseCase: FindOneTaskUseCase;
  let taskRepository: TaskRepository;

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
      ],
    }).compile();

    findOneTaskUseCase = module.get<FindOneTaskUseCase>(FindOneTaskUseCase);
    taskRepository = module.get<TaskRepository>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(findOneTaskUseCase).toBeDefined();
  });

  it('should return a task when found', async () => {
    const task = new Task();
    task.id = 1;
    jest.spyOn(taskRepository, 'findOneByOrFail').mockResolvedValue(task);

    expect(await findOneTaskUseCase.execute(1)).toBe(task);
  });

  it('should throw an error when task is not found', async () => {
    jest
      .spyOn(taskRepository, 'findOneByOrFail')
      .mockRejectedValue(new Error('Task not found'));

    await expect(findOneTaskUseCase.execute(1)).rejects.toThrow(
      'Task not found',
    );
  });
});
