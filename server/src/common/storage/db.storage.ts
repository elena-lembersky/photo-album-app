// src/common/storage/db.storage.ts
import { IStorage } from '../interfaces/i-storage.interface';

export class DbStorage implements IStorage {
  async read<T>(filePath: string): Promise<T> {
    return {} as T;
  }

  async write<T>(filePath: string, data: T): Promise<void> {
    console.log('Saving data to database');
  }

  async update<T>(
    filePath: string,
    updateData: Partial<T>,
    identifier: (item: T) => boolean,
  ): Promise<void> {
    console.log('Updating data in database');
  }

  async delete<T>(
    filePath: string,
    identifier: (item: T) => boolean,
  ): Promise<void> {
    console.log('Deleting data from database');
  }
}
