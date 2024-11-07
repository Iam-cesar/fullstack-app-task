import { BaseRepository } from '../../infrastructure/persistence/repository/base.repository';
import { RepositoryResponseInterface } from '../../infrastructure/gateways/repository-response.interface';
import { Task } from '../entities/task.entity';
import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { RepositoryResponseImpl } from '../../infrastructure/gateways/repository-response.impl';

@Injectable()
export class RemoveTaskRepository extends BaseRepository {
  constructor(
    private readonly repositoryResponse: RepositoryResponseImpl<Task>,
  ) {
    super();
  }

  async execute(id: UUID): Promise<RepositoryResponseInterface<Task>> {
    try {
      const tasks = await this.readFile();
      tasks.filter((task: Task) => task.id !== id);
      await this.writeFile(tasks);
      return this.repositoryResponse.create<Task>(null, `Task ${id} deleted successfully`, null);
    } catch (error) {
      return this.repositoryResponse.create<Task>(error, error.message, null);
    }
  }
}
