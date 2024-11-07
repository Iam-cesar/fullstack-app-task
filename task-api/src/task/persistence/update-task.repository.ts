import { BaseRepository } from '../../infrastructure/persistence/repository/base.repository';
import { RepositoryResponseInterface } from '../../infrastructure/gateways/repository-response.interface';
import { Task } from '../entities/task.entity';
import { UUID } from 'crypto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Injectable } from '@nestjs/common';
import { RepositoryResponseImpl } from '../../infrastructure/gateways/repository-response.impl';

@Injectable()
export class UpdateTaskRepository extends BaseRepository {
  constructor(
    private readonly repositoryResponse: RepositoryResponseImpl<Task>,
  ) {
    super();
  }

  async execute(
    id: UUID,
    updateDTO: UpdateTaskDto,
  ): Promise<RepositoryResponseInterface<Task>> {
    try {
      const data = await this.readFile();
      const selectedTask: Task[] = data.filter((task: Task) => task.id === id);
      const taskAtIndexZero = selectedTask?.[0];
      if (!taskAtIndexZero) return null;
      const taskUpdated = { ...taskAtIndexZero, ...updateDTO };
      return this.repositoryResponse.create<Task>(null, null, taskUpdated);
    } catch (error) {
      return this.repositoryResponse.create<Task>(error, error.message, null);
    }
  }
}
