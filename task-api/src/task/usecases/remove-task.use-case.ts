import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { RemoveTaskRepository } from '../persistence/remove-task.repository';

@Injectable()
export class RemoveTaskUseCase {
  constructor(private readonly repo: RemoveTaskRepository) {
  }

  execute(id: UUID) {
    return this.repo.execute(id);
  }
}
