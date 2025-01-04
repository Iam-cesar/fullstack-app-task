import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';

@Injectable()
export class RemoveTaskUseCase {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneOrFail({ where: { id } });
    return await this.taskRepository.remove(task);
  }
}
