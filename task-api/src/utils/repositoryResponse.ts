import { Injectable } from '@nestjs/common';

@Injectable()
export default class RepositoryResponse<T> {
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

  static create<T>(
    error: Error,
    message: string,
    data: T,
  ): RepositoryResponse<T> {
    return new RepositoryResponse(error, message, data);
  }
}
