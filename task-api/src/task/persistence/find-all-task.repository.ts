import { Injectable } from '@nestjs/common';
import { RepositoryResponseImpl } from '../../infrastructure/gateways/repository-response.impl';
import { RepositoryResponseInterface } from '../../infrastructure/gateways/repository-response.interface';
import { BaseRepository } from '../../infrastructure/persistence/repository/base.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class FindAllTaskRepository extends BaseRepository {
  constructor(
    private readonly repositoryResponse: RepositoryResponseImpl<Task[]>,
  ) {
    super();
  }

  async execute(): Promise<RepositoryResponseInterface<Task[]>> {
    try {
      const data = await this.readFile();
      const allTasks = data.tasks;
      return this.repositoryResponse.create<Task[]>(null, null, allTasks);
    } catch (error) {
      return this.repositoryResponse.create<Task[]>(error, error.message, []);
    }
  }
}
