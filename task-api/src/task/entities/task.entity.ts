import { UUID } from 'crypto';

export class Task {
  id: UUID;
  title: string;
  content: string;
}
