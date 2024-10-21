import { UUID } from 'crypto';

export interface IWrite<T> {
  create(createDto: T): Promise<string>;
  update(id: UUID, updateDTO: T): Promise<T>;
}
