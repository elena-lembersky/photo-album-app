export interface IStorage {
  read<T>(path: string): Promise<T>;
  write<T>(path: string, data: T): Promise<void>;
  update<T>(path: string, data: T): Promise<void>;
  delete<T>(path: string, identifier: string): Promise<void>;
}
