import { Module } from '@nestjs/common';
import { TaskController } from './adapters/controllers/task.controller';
import { CreateTaskUseCase } from './usecases/create-task.use-case';
import { FindAllTaskUseCase } from './usecases/find-all-task.use-case';
import { FindOneTaskUseCase } from './usecases/find-one-task.use-case';
import { RemoveTaskUseCase } from './usecases/remove-task.use-case';
import { UpdateTaskUseCase } from './usecases/update-task.use-case';
import { CreateTaskRepository } from './persistence/create-task.repository';
import { FindAllTaskRepository } from './persistence/find-all-task.repository';
import { FindOneTaskRepository } from './persistence/find-one-task.repository';
import { RemoveTaskRepository } from './persistence/remove-task.repository';
import { UpdateTaskRepository } from './persistence/update-task.repository';
import { RepositoryResponseImpl } from '../infrastructure/gateways/repository-response.impl';

@Module({
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    FindOneTaskUseCase,
    FindAllTaskUseCase,
    UpdateTaskUseCase,
    RemoveTaskUseCase,
    CreateTaskRepository,
    FindAllTaskRepository,
    FindOneTaskRepository,
    RemoveTaskRepository,
    UpdateTaskRepository,
    RepositoryResponseImpl,
  ],
  exports: [],
})
export class TaskModule {
}
