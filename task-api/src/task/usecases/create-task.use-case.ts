import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { CreateTaskRepository } from '../persistence/create-task.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly repo: CreateTaskRepository) {
  }

  execute(input: CreateTaskDto) {
    return this.repo.execute(new Task(input));
  }
}
