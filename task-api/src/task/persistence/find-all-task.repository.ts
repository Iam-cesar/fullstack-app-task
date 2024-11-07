import { RepositoryResponseInterface } from '../../infrastructure/gateways/repository-response.interface';
import { Task } from '../entities/task.entity';
import { BaseRepository } from '../../infrastructure/persistence/repository/base.repository';
import { Injectable } from '@nestjs/common';
import { RepositoryResponseImpl } from '../../infrastructure/gateways/repository-response.impl';

@Injectable()
export class FindAllTaskRepository extends BaseRepository {
  constructor(private readonly repositoryResponse: RepositoryResponseImpl<Task[]>) {
    super();
  }

  async execute(): Promise<RepositoryResponseInterface<Task[]>> {
    try {
      const allTasks = await this.readFile();
      return this.repositoryResponse.create<Task[]>(null, null, allTasks);
    } catch (error) {
      return this.repositoryResponse.create<Task[]>(error, error.message, []);
    }
  }
}
