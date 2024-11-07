import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { FindOneTaskRepository } from '../persistence/find-one-task.repository';

@Injectable()
export class FindOneTaskUseCase {
  constructor(private readonly repo: FindOneTaskRepository) {
  }

  execute(id: UUID) {
    return this.repo.execute(id);
  }
}
