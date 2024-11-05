import { Injectable } from '@nestjs/common';
import { RepositoryResponseInterface } from './repository-response.interface';

@Injectable()
export default class RepositoryResponseImpl<T>
  implements RepositoryResponseInterface<T>
{
  private readonly message: string | null;
  private readonly data: T | null;
  private readonly error: Error | null;
  private readonly hasError: boolean;

  constructor(error: Error, message: string, data: T) {
    this.data = data;
    this.message = message;
    this.error = error;
    this.hasError = !!error;
  }

  create<T>(error: Error, message: string, data: T): RepositoryResponseInterface<T> {
    return new RepositoryResponseImpl(error, message, data);
  }
}
