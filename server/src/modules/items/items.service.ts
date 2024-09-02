import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.interface';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ItemsService {
  private readonly dataPath = path.resolve(
    __dirname,
    '../../../data/items.json',
  );

  constructor(private readonly albumsService: AlbumsService) {}

  async findAll(): Promise<Item[]> {
    try {
      const data = await fs.promises.readFile(this.dataPath, 'utf8');
      return JSON.parse(data) as Item[];
    } catch (error) {
      throw new Error('Failed to read items data');
    }
  }

  async findByAlbumId(albumId: string): Promise<Item[]> {
    const items = await this.findAll();
    return items.filter((item) => item.albumId === albumId);
  }

  async findOne(itemId: string): Promise<Item> {
    const items = await this.findAll();
    const item = items.find((item) => item.id === itemId);
    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }
    return item;
  }

  async create(albumId: string, createItemDto: CreateItemDto): Promise<Item> {
    const items = await this.findAll();

    const newItem: Item = {
      id: uuidv4(),
      albumId,
      url: `https://picsum.photos/id/${createItemDto.imageId}/600/800`,
      title: createItemDto.title,
    };

    items.push(newItem);
    await this.saveItems(items);

    await this.updateCoverImage(albumId);
    return newItem;
  }

  async update(itemId: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const items = await this.findAll();
    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }

    const updatedItem = {
      ...items[itemIndex],
      ...updateItemDto,
    };

    items[itemIndex] = updatedItem;
    await this.saveItems(items);

    await this.updateCoverImage(items[itemIndex].albumId);
    return updatedItem;
  }

  async remove(itemId: string): Promise<void> {
    const items = await this.findAll();
    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }

    const [removedItem] = items.splice(itemIndex, 1);
    await this.saveItems(items);

    await this.updateCoverImage(removedItem.albumId);
  }

  private async saveItems(items: Item[]): Promise<void> {
    await fs.promises.writeFile(this.dataPath, JSON.stringify(items, null, 2));
  }

  private async updateCoverImage(albumId: string): Promise<void> {
    const items = await this.findByAlbumId(albumId);
    const album = await this.albumsService.findOne(albumId);

    if (items.length === 0) {
      album.coverImage = null;
    } else {
      album.coverImage = items[0].url;
    }

    await this.albumsService.update(album.id, { coverImage: album.coverImage });
  }
}
