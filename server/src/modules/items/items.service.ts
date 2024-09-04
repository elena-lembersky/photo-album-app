import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IStorage } from 'common/interfaces/i-storage.interface';
import { CreateItemDto, UpdateItemDto } from './dto';
import { Item } from './item.interface';
import { AlbumsService } from '@modules/albums/albums.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('IStorage') private storage: IStorage,
    private readonly albumsService: AlbumsService,
  ) {}

  private readonly filePath = '../../../data/items.json';

  async findAll(): Promise<Item[]> {
    return await this.storage.read<Item[]>(this.filePath);
  }

  async findByAlbumId(albumId: string): Promise<Item[]> {
    const items = await this.findAll();
    return items.filter((item) => item.albumId === albumId);
  }

  async findOne(id: string): Promise<Item> {
    const items = await this.findAll();
    const item = items.find((item) => item.id === id);
    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);
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
    await this.storage.write(this.filePath, items);

    // Update the album's cover image if it's the first item in the album
    const album = await this.albumsService.findOne(albumId);
    if (!album.coverImage) {
      await this.albumsService.update(albumId, { coverImage: newItem.url });
    }

    return newItem;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const items = await this.findAll();
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1)
      throw new NotFoundException(`Item with id: ${id} not found`);

    const updatedItem = { ...items[itemIndex], ...updateItemDto };
    items[itemIndex] = updatedItem;
    await this.storage.write(this.filePath, items);
    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    const items = await this.findAll();
    const item = items.find((item) => item.id === id);
    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);

    const updatedItems = items.filter((item) => item.id !== id);
    await this.storage.write(this.filePath, updatedItems);

    const remainingItems = updatedItems.filter(
      (i) => i.albumId === item.albumId,
    );

    if (remainingItems.length === 0) {
      await this.albumsService.update(item.albumId, { coverImage: null });
    } else {
      await this.albumsService.update(item.albumId, {
        coverImage: remainingItems[0].url,
      });
    }
  }
}
