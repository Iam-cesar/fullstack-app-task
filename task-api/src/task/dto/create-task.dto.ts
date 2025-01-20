import { TaskEnumStatus } from '../entities/task.enum';

export class CreateTaskDto {
  title: string;
  description: string;
  status: TaskEnumStatus
}
