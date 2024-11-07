import { RepositoryResponseImpl } from '../../infrastructure/gateways/repository-response.impl';
import { Task } from '../entities/task.entity';
import { RepositoryResponseInterface } from '../../infrastructure/gateways/repository-response.interface';
import { BaseRepository } from '../../infrastructure/persistence/repository/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTaskRepository extends BaseRepository {
  constructor(
    private readonly repositoryResponse: RepositoryResponseImpl<Task>,
  ) {
    super();
  }

  async execute(
    newTask: Task,
  ): Promise<RepositoryResponseInterface<Task>> {
    try {
      let data = await this.readFile();
      const hasTaskContent = !!data?.tasks;
      if (!hasTaskContent) data = { ...data, tasks: [] };
      data.tasks.push(newTask);
      await this.writeFile(data);
      return this.repositoryResponse.create<Task>(
        null,
        `Task ${newTask.title} created successfully`,
        null,
      );
    } catch (error) {
      return this.repositoryResponse.create<Task>(error, error.message, null);
    }
  }
}
