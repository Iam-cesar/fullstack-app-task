import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskUseCase } from '../../../task/usecases/create-task.use-case';
import { FindAllTaskUseCase } from '../../../task/usecases/find-all-task.use-case';
import { FindOneTaskUseCase } from '../../../task/usecases/find-one-task.use-case';
import { RemoveTaskUseCase } from '../../../task/usecases/remove-task.use-case';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { Task } from '../../entities/task.entity';
import { TaskController } from './task.controller';

describe('TaskController', () => {
  let controller: TaskController;
  let createTaskUseCase: CreateTaskUseCase;
  let findAllTaskUseCase: FindAllTaskUseCase;
  let findOneTaskUseCase: FindOneTaskUseCase;
  let removeTaskUseCase: RemoveTaskUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: CreateTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindOneTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RemoveTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
    findAllTaskUseCase = module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
    findOneTaskUseCase = module.get<FindOneTaskUseCase>(FindOneTaskUseCase);
    removeTaskUseCase = module.get<RemoveTaskUseCase>(RemoveTaskUseCase);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: '',
      };
      const result: Task = {
        id: 1,
        ...createTaskDto,
        isCompleted: false,
        createdAt: '',
        updatedAt: '',
      };
      jest.spyOn(createTaskUseCase, 'execute').mockResolvedValue(result);

      expect(await controller.create(createTaskDto)).toBe(result);
    });

    it('should throw an error if creation fails', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: '',
      };
      jest
        .spyOn(createTaskUseCase, 'execute')
        .mockRejectedValue(new Error('Error creating task'));

      await expect(controller.create(createTaskDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: 1,
          title: 'Test Task',
          description: '',
          isCompleted: false,
          createdAt: '',
          updatedAt: '',
        },
      ];
      jest.spyOn(findAllTaskUseCase, 'execute').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should throw an error if fetching fails', async () => {
      jest
        .spyOn(findAllTaskUseCase, 'execute')
        .mockRejectedValue(new Error('Error fetching tasks'));

      await expect(controller.findAll()).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const result: Task = {
        id: 1,
        title: 'Test Task',
        description: '',
        isCompleted: false,
        createdAt: '',
        updatedAt: '',
      };
      jest.spyOn(findOneTaskUseCase, 'execute').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });

    it('should throw an error if id is not a number', async () => {
      await expect(controller.findOne('abc')).rejects.toThrow(HttpException);
    });

    it('should throw an error if task is not found', async () => {
      jest
        .spyOn(findOneTaskUseCase, 'execute')
        .mockRejectedValue(new Error('Task not found'));

      await expect(controller.findOne('1')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: Task = {
        title: 'Updated Task',
        id: 0,
        description: '',
        isCompleted: false,
        createdAt: '',
        updatedAt: '',
      };
      const result = { id: 1, ...updateTaskDto };
      jest.spyOn(createTaskUseCase, 'execute').mockResolvedValue(result);

      expect(await controller.update('1', updateTaskDto)).toBe(result);
    });

    it('should throw an error if id is not a number', async () => {
      await expect(controller.update('abc', {})).rejects.toThrow(HttpException);
    });

    it('should throw an error if update fails', async () => {
      const updateTaskDto: Partial<Task> = { title: 'Updated Task' };
      jest
        .spyOn(createTaskUseCase, 'execute')
        .mockRejectedValue(new Error('Task not found'));

      await expect(controller.update('1', updateTaskDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const result: Task = {
        id: 1,
        title: 'Test Task',
        description: '',
        isCompleted: false,
        createdAt: '',
        updatedAt: '',
      };
      jest.spyOn(removeTaskUseCase, 'execute').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });

    it('should throw an error if id is not a number', async () => {
      await expect(controller.remove('abc')).rejects.toThrow(HttpException);
    });

    it('should throw an error if removal fails', async () => {
      jest
        .spyOn(removeTaskUseCase, 'execute')
        .mockRejectedValue(new Error('Task not found'));

      await expect(controller.remove('1')).rejects.toThrow(HttpException);
    });
  });
});
