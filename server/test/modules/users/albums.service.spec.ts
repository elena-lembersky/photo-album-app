import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsService } from '@modules/albums/albums.service';
import { UsersService } from '@modules/users/users.service';
import { CreateAlbumDto, UpdateAlbumDto } from '@modules/albums/dto';
import { NotFoundException } from '@nestjs/common';
import { IStorage } from 'common/interfaces/i-storage.interface';

describe('AlbumsService', () => {
  let albumsService: AlbumsService;
  let usersService: UsersService;
  let storage: IStorage;

  const mockAlbums = [
    {
      id: '1',
      userId: '101',
      title: 'Vacation 2023',
      coverImage: 'https://picsum.photos/id/1/600/800',
    },
    {
      id: '2',
      userId: '102',
      title: 'Family Reunion',
      coverImage: 'https://picsum.photos/id/2/600/800',
    },
  ];

  const mockUser = {
    id: '101',
    name: 'John Doe',
    email: 'johndoe@example.com',
    albumCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockUsersService = {
    findOne: jest.fn(() => Promise.resolve(mockUser)), // Правильная типизация мока
    update: jest.fn(),
  };

  const mockStorage = {
    read: jest.fn().mockResolvedValue(mockAlbums),
    write: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumsService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: 'IStorage',
          useValue: mockStorage,
        },
      ],
    }).compile();

    albumsService = module.get<AlbumsService>(AlbumsService);
    usersService = module.get<UsersService>(UsersService);
    storage = module.get<IStorage>('IStorage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all albums', async () => {
    const albums = await albumsService.findAll();
    expect(storage.read).toHaveBeenCalledWith(expect.any(String));
    expect(albums).toEqual(mockAlbums);
  });

  it('should return albums by userId', async () => {
    const albums = await albumsService.findByUserId('101');
    expect(albums).toEqual([mockAlbums[0]]);
  });

  it('should return one album by albumId', async () => {
    const album = await albumsService.findOne('1');
    expect(album).toEqual(mockAlbums[0]);
  });

  it('should throw an error if album not found', async () => {
    await expect(albumsService.findOne('999')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should create a new album and update user album count', async () => {
    const createAlbumDto: CreateAlbumDto = {
      title: 'New Album',
    };

    const newAlbum = await albumsService.create('101', createAlbumDto);

    expect(newAlbum).toHaveProperty('id');
    expect(newAlbum.title).toBe(createAlbumDto.title);
    expect(newAlbum.userId).toBe('101');
    expect(usersService.update).toHaveBeenCalledWith('101', {
      albumCount: 2,
    });
    expect(storage.write).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Array),
    );
  });

  it('should update an existing album', async () => {
    const updateAlbumDto: UpdateAlbumDto = {
      title: 'Updated Album',
    };
    const updatedAlbum = await albumsService.update('1', updateAlbumDto);
    expect(updatedAlbum.title).toBe(updateAlbumDto.title);
    expect(storage.write).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Array),
    );
  });

  it('should throw an error when trying to update a non-existent album', async () => {
    const updateAlbumDto: UpdateAlbumDto = {
      title: 'Non-existent Album',
    };
    await expect(albumsService.update('999', updateAlbumDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should remove an album and update user album count', async () => {
    await albumsService.remove('1');
    expect(usersService.update).toHaveBeenCalledWith('101', {
      albumCount: 0,
    });
    expect(storage.write).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Array),
    );
  });

  it('should throw an error when trying to remove a non-existent album', async () => {
    await expect(albumsService.remove('999')).rejects.toThrow(
      NotFoundException,
    );
  });
});
