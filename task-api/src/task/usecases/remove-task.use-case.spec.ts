import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';
import { RemoveTaskUseCase } from './remove-task.use-case';

describe('RemoveTaskUseCase', () => {
  let removeTaskUseCase: RemoveTaskUseCase;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveTaskUseCase,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            findOneOrFail: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    removeTaskUseCase = module.get<RemoveTaskUseCase>(RemoveTaskUseCase);
    taskRepository = module.get<TaskRepository>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(removeTaskUseCase).toBeDefined();
  });

  it('should remove a task successfully', async () => {
    const taskId = 1;
    const task = new Task();
    task.id = taskId;

    jest.spyOn(taskRepository, 'findOneOrFail').mockResolvedValue(task);
    jest.spyOn(taskRepository, 'remove').mockResolvedValue(task);

    const result = await removeTaskUseCase.execute(taskId);

    expect(taskRepository.findOneOrFail).toHaveBeenCalledWith({
      where: { id: taskId },
    });
    expect(taskRepository.remove).toHaveBeenCalledWith(task);
    expect(result).toEqual(task);
  });

  it('should throw an error if task is not found', async () => {
    const taskId = 1;

    jest
      .spyOn(taskRepository, 'findOneOrFail')
      .mockRejectedValue(new Error('Task not found'));

    await expect(removeTaskUseCase.execute(taskId)).rejects.toThrow(
      'Task not found',
    );
    expect(taskRepository.findOneOrFail).toHaveBeenCalledWith({
      where: { id: taskId },
    });
    expect(taskRepository.remove).not.toHaveBeenCalled();
  });
});
