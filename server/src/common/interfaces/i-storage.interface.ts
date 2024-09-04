// src/common/interfaces/i-storage.interface.ts
export interface IStorage {
  read<T>(filePath: string): Promise<T>;
  write<T>(filePath: string, data: T): Promise<void>;
  update<T>(
    filePath: string,
    updateData: Partial<T>,
    identifier: (item: T) => boolean,
  ): Promise<void>;
  delete<T>(filePath: string, identifier: (item: T) => boolean): Promise<void>;
}
