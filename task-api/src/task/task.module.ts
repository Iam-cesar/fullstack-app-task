import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from './usecases/create-task.use-case';
import { FindAlltaskUseCase } from './usecases/find-all-task.use-case';
import { FindOnetaskUseCase } from './usecases/find-one-task.use-case';
import { RemoveTaskUseCase } from './usecases/remove-task.use-case';
import { UpdateTaskUseCase } from './usecases/update-task.use-case';
import { TaskController } from './adapters/controllers/task.controller';
import TaskRepositoryImpl from './persistence/task.repository';

@Module({
  controllers: [
    TaskController,
  ],
  providers: [
    TaskRepositoryImpl,
    CreateTaskUseCase,
    FindOnetaskUseCase,
    FindAlltaskUseCase,
    UpdateTaskUseCase,
    RemoveTaskUseCase,
  ],
})
export class TaskModule {}
