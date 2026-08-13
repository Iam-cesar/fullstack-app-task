import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { buildSelectClause } from '../../core/utils/entity-columns';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';

@Injectable()
export class FindOneTaskUseCase {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: number): Promise<Task> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const selectClause = buildSelectClause(this.dataSource, Task);
      const query = `SELECT ${selectClause} FROM task WHERE id = $1`;
      const result = await queryRunner.query(query, [id]);
      return result[0] ?? null;
    } finally {
      await queryRunner.release();
    }
  }
}
