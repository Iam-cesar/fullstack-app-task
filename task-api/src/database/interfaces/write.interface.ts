import { UUID } from 'crypto';
import RepositoryResponse from 'src/utils/repositoryResponse';

export interface IWrite<T> {
  create(createDto: T): Promise<RepositoryResponse<T>>;
  update(id: UUID, updateDTO: T): Promise<RepositoryResponse<T>>;
}
