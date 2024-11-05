export interface RepositoryResponseInterface<T> {
  create<T>(
    error: Error,
    message: string,
    data: T,
  ): RepositoryResponseInterface<T>;
}
