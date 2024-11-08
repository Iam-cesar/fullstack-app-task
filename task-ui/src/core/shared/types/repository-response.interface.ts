export interface RepositoryResponseInterface<T> {
  error: Error,
  message: string,
  data: T,
}
