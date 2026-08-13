import { TaskController } from './adapters/controllers/task.controller';
import { TaskRepository } from './persistence/task.repository';
import { TaskModule } from './task.module';
import { CreateTaskUseCase } from './usecases/create-task.use-case';
import { FindAllTaskUseCase } from './usecases/find-all-task.use-case';
import { FindOneTaskUseCase } from './usecases/find-one-task.use-case';
import { RemoveTaskUseCase } from './usecases/remove-task.use-case';

describe('TaskModule', () => {
  it('should be defined', () => {
    expect(TaskModule).toBeDefined();
  });

  it('should register the task controller', () => {
    const controllers = Reflect.getMetadata('controllers', TaskModule) ?? [];

    expect(controllers).toEqual([TaskController]);
  });

  it('should register the repository and every use case', () => {
    const providers = Reflect.getMetadata('providers', TaskModule) ?? [];

    expect(providers).toEqual([
      TaskRepository,
      CreateTaskUseCase,
      FindOneTaskUseCase,
      FindAllTaskUseCase,
      RemoveTaskUseCase,
    ]);
  });
});
