import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from '@modules/items/items.service';
import { AlbumsService } from '@modules/albums/albums.service';
import { NotFoundException } from '@nestjs/common';
import { Item } from '@modules/items/item.interface';
import { CreateItemDto, UpdateItemDto } from '@modules/items/dto';
import { IStorage } from 'common/interfaces/i-storage.interface';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('4'),
}));

describe('ItemsService', () => {
  let itemsService: ItemsService;
  let albumsService: AlbumsService;
  let storage: IStorage;

  const mockItems: Item[] = [
    {
      id: '1',
      albumId: '101',
      url: 'https://picsum.photos/id/1/600/800',
      title: 'Beautiful Landscape',
    },
    {
      id: '2',
      albumId: '101',
      url: 'https://picsum.photos/id/2/600/800',
      title: 'City at Night',
    },
    {
      id: '3',
      albumId: '102',
      url: 'https://picsum.photos/id/3/600/800',
      title: 'Mountain View',
    },
  ];

  const mockFindOneAlbum = jest.fn().mockResolvedValue({
    id: '101',
    userId: '1',
    title: 'Vacation Album',
    coverImage: null,
  });

  const mockStorage: Partial<IStorage> = {
    read: jest.fn().mockResolvedValue(mockItems), // Properly typed mock
    write: jest.fn().mockResolvedValue(undefined),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: AlbumsService,
          useValue: {
            findOne: mockFindOneAlbum,
            update: jest.fn(),
          },
        },
        {
          provide: 'IStorage',
          useValue: mockStorage,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    albumsService = module.get<AlbumsService>(AlbumsService);
    storage = module.get<IStorage>('IStorage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all items', async () => {
    const items = await itemsService.findAll();
    expect(storage.read).toHaveBeenCalledWith(expect.any(String));
    expect(items).toEqual(mockItems);
  });

  it('should return items by albumId', async () => {
    const items = await itemsService.findByAlbumId('101');
    expect(items).toEqual([mockItems[0], mockItems[1]]);
  });

  it('should return one item by itemId', async () => {
    const item = await itemsService.findOne('1');
    expect(item).toEqual(mockItems[0]);
  });

  it('should throw an error if item not found', async () => {
    await expect(itemsService.findOne('999')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update an existing item', async () => {
    const updateItemDto: UpdateItemDto = {
      title: 'Updated Photo',
    };

    const updatedItem = await itemsService.update('1', updateItemDto);

    expect(updatedItem.title).toBe('Updated Photo');
    expect(storage.write).toHaveBeenCalled();
  });

  it('should throw an error when updating a non-existent item', async () => {
    const updateItemDto: UpdateItemDto = {
      title: 'Non-existent Item',
    };

    await expect(itemsService.update('999', updateItemDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should remove an item and update album coverImage', async () => {
    const albumId = '101';
    jest
      .spyOn(itemsService, 'findByAlbumId')
      .mockResolvedValueOnce([mockItems[1]]);

    await itemsService.remove('1');
    expect(storage.write).toHaveBeenCalled();

    expect(albumsService.update).toHaveBeenCalledWith(albumId, {
      coverImage: mockItems[0].url,
    });
  });

  it('should remove the coverImage if the last item is deleted', async () => {
    const albumId = '101';

    jest.spyOn(itemsService, 'findByAlbumId').mockResolvedValueOnce([]);

    await itemsService.remove('3');
    expect(storage.write).toHaveBeenCalled();

    expect(albumsService.update).toHaveBeenCalledWith(albumId, {
      coverImage: null,
    });
  });

  it('should throw an error when removing a non-existent item', async () => {
    await expect(itemsService.remove('999')).rejects.toThrow(NotFoundException);
  });
});
