import { randomUUID, UUID } from 'crypto';
import { CreateTaskDto } from '../dto/create-task.dto';

export class Task {
  id: UUID;
  title: string;
  content: string;

  constructor({ title, content }: CreateTaskDto) {
    this.id = randomUUID();
    this.title = title;
    this.content = content;
  }
}
