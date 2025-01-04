import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';
import { FindAllTaskUseCase } from './find-all-task.use-case';

describe('FindAllTaskUseCase', () => {
  let findAllTaskUseCase: FindAllTaskUseCase;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTaskUseCase,
        {
          provide: getRepositoryToken(Task),
          useClass: TaskRepository,
        },
      ],
    }).compile();

    findAllTaskUseCase = module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
    taskRepository = module.get<TaskRepository>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(findAllTaskUseCase).toBeDefined();
  });

  it('should return an array of tasks', async () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        isCompleted: false,
        createdAt: '',
        updatedAt: '',
      },
    ];
    jest.spyOn(taskRepository, 'find').mockResolvedValue(tasks);

    const result = await findAllTaskUseCase.execute();
    expect(result).toEqual(tasks);
  });

  it('should call taskRepository.find with correct parameters', async () => {
    const params = { where: { title: 'Test Task' } };
    const findSpy = jest.spyOn(taskRepository, 'find').mockResolvedValue([]);

    await findAllTaskUseCase.execute(params);
    expect(findSpy).toHaveBeenCalledWith(params);
  });
});
