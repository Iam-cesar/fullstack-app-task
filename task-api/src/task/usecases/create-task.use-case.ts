import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(input: CreateTaskDto | UpdateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(input);
    return await this.taskRepository.save(task);
  }
}
