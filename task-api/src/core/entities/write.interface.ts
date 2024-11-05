import { UUID } from 'crypto';
import { RepositoryResponseInterface } from '../../infrastructure/gateways/repositoryResponse.interface';

export interface IWrite<T> {
  create(createDto): Promise<RepositoryResponseInterface<T>>;

  update(id: UUID, updateDTO): Promise<RepositoryResponseInterface<T>>;
}
