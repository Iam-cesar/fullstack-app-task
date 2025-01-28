import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';
import { CreateTaskUseCase } from './create-task.use-case';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: getRepositoryToken(Task),
          useClass: TaskRepository,
        },
      ],
    }).compile();

    createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
    taskRepository = module.get<TaskRepository>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(createTaskUseCase).toBeDefined();
  });

  it('should create and save a task', async () => {
    const input: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    };

    const task: Task = {
      ...input,
      id: 0,
      status: 'PENDING',
      createdAt: '',
      updatedAt: '',
    };

    jest.spyOn(taskRepository, 'create').mockReturnValue(task);
    jest.spyOn(taskRepository, 'save').mockResolvedValue(task);

    const result = await createTaskUseCase.execute(input);

    expect(taskRepository.create).toHaveBeenCalledWith(input);
    expect(taskRepository.save).toHaveBeenCalledWith(task);
    expect(result).toEqual(task);
  });
});
