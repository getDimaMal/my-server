export interface IFetchableServiceInterface<T> {
  fetchItems(): Promise<T[]>;
}