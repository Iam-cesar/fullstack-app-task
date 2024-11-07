import { Injectable } from '@nestjs/common';
import { FindAllTaskRepository } from '../persistence/find-all-task.repository';

@Injectable()
export class FindAllTaskUseCase {
  constructor(private readonly repo: FindAllTaskRepository) {
  }

  execute() {
    return this.repo.execute();
  }
}
