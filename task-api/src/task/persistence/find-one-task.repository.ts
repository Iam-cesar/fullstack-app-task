import { UUID } from 'crypto';
import { RepositoryResponseInterface } from '../../infrastructure/gateways/repository-response.interface';
import { Task } from '../entities/task.entity';
import { BaseRepository } from '../../infrastructure/persistence/repository/base.repository';
import { Injectable } from '@nestjs/common';
import { RepositoryResponseImpl } from '../../infrastructure/gateways/repository-response.impl';

@Injectable()
export class FindOneTaskRepository extends BaseRepository {
  constructor(
    private readonly repositoryResponse: RepositoryResponseImpl<Task>,
  ) {
    super();
  }

  async execute(id: UUID): Promise<RepositoryResponseInterface<Task>> {
    try {
      const data = await this.readFile();
      const tasks = data.tasks.filter((task: Task) => task.id === id);
      return this.repositoryResponse.create<Task>(null, null, tasks?.[0]);
    } catch (error) {
      return this.repositoryResponse.create<Task>(error, error.message, null);
    }
  }
}
