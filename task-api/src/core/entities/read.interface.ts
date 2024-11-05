import { UUID } from 'crypto';
import { RepositoryResponseInterface } from '../../infrastructure/gateways/repository-response.interface';

export interface IRead<T> {
  findAll(): Promise<RepositoryResponseInterface<T[]>>;

  findOne(id: UUID): Promise<RepositoryResponseInterface<T>>;

  remove(id: UUID): Promise<RepositoryResponseInterface<T>>;
}
