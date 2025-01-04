import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './adapters/controllers/task.controller';
import { Task } from './entities/task.entity';
import { TaskRepository } from './persistence/task.repository';
import { CreateTaskUseCase } from './usecases/create-task.use-case';
import { FindAllTaskUseCase } from './usecases/find-all-task.use-case';
import { FindOneTaskUseCase } from './usecases/find-one-task.use-case';
import { RemoveTaskUseCase } from './usecases/remove-task.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    CreateTaskUseCase,
    FindOneTaskUseCase,
    FindAllTaskUseCase,
    RemoveTaskUseCase,
  ],
  exports: [],
})
export class TaskModule {}
