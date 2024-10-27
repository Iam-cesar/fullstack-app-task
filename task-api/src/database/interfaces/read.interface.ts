import { UUID } from 'crypto';
import RepositoryResponse from 'src/utils/repositoryResponse';

export interface IRead<T> {
  findAll(): Promise<RepositoryResponse<T[]>>;
  findOne(id: UUID): Promise<RepositoryResponse<T>>;
  remove(id: UUID): Promise<RepositoryResponse<T>>;
}
