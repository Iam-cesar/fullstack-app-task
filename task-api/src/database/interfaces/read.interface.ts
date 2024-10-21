import { UUID } from 'crypto';

export interface IRead<T> {
  findAll(): Promise<T[]>;
  findOne(id: UUID): Promise<T | null>;
  remove(id: UUID): Promise<string>;
}
