import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { UpdateTaskRepository } from '../persistence/update-task.repository';

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly repo: UpdateTaskRepository) {
  }

  execute(id: UUID, updateDto: UpdateTaskDto) {
    return this.repo.execute(id, updateDto);
  }

}
