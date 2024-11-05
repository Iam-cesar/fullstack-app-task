import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { RepositoryResponseInterface } from '../../infrastructure/gateways/repositoryResponse.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository.interface';
import { TaskService } from './task.service.interface';

@Injectable()
export class TaskServiceImpl implements TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  create(
    createTaskDto: CreateTaskDto,
  ): Promise<RepositoryResponseInterface<Task>> {
    return this.taskRepository.create(createTaskDto);
  }

  findAll(): Promise<RepositoryResponseInterface<Task>> {
    return this.taskRepository.findAll();
  }

  findOne(id: UUID): Promise<RepositoryResponseInterface<Task>> {
    return this.taskRepository.findOne(id);
  }

  remove(id: UUID): Promise<RepositoryResponseInterface<Task>> {
    return this.taskRepository.remove(id);
  }

  update(
    id: UUID,
    updateTaskDto: UpdateTaskDto,
  ): Promise<RepositoryResponseInterface<Task>> {
    return this.taskRepository.update(id, updateTaskDto);
  }
}
