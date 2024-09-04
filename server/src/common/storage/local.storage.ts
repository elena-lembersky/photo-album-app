// src/common/storage/local.storage.ts
import * as fs from 'fs';
import * as path from 'path';
import { IStorage } from '../interfaces/i-storage.interface';

export class LocalStorage implements IStorage {
  async read<T>(filePath: string): Promise<T> {
    const dataPath = path.resolve(__dirname, filePath);
    const data = await fs.promises.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  }

  async write<T>(filePath: string, data: T): Promise<void> {
    const dataPath = path.resolve(__dirname, filePath);
    await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2));
  }

  async update<T>(
    filePath: string,
    updateData: Partial<T>,
    identifier: (item: T) => boolean,
  ): Promise<void> {
    const items = await this.read<T[]>(filePath);
    const index = items.findIndex(identifier);
    if (index === -1) throw new Error('Item not found');
    items[index] = { ...items[index], ...updateData };
    await this.write(filePath, items);
  }

  async delete<T>(
    filePath: string,
    identifier: (item: T) => boolean,
  ): Promise<void> {
    const items = await this.read<T[]>(filePath);
    const filteredItems = items.filter((item) => !identifier(item));
    await this.write(filePath, filteredItems);
  }
}
