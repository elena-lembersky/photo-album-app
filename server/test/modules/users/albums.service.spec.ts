import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsService } from '@modules/albums/albums.service';
import { UsersService } from '@modules/users/users.service';
import * as fs from 'fs/promises';
import { jest } from '@jest/globals';
import { CreateAlbumDto, UpdateAlbumDto } from '@modules/albums/dto';
import { Album } from '@modules/albums/albums.interface';
import { NotFoundException } from '@nestjs/common';

describe('AlbumsService', () => {
  let albumsService: AlbumsService;
  let usersService: UsersService;

  const mockAlbums: Album[] = [
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

  // @ts-ignore
  const mockFindOne = jest.fn().mockResolvedValue({
    id: '101',
    name: 'John Doe',
    email: 'johndoe@example.com',
    albumCount: 1,
  });

  const mockUsersService = {
    findOne: mockFindOne,
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumsService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    albumsService = module.get<AlbumsService>(AlbumsService);
    usersService = module.get<UsersService>(UsersService);

    jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify(mockAlbums));
    jest.spyOn(fs, 'writeFile').mockResolvedValue(undefined);
    jest
      .spyOn(global.Date, 'now')
      .mockReturnValue(new Date('2024-08-29T12:38:55.750Z').getTime());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all albums', async () => {
    const albums = await albumsService.findAll();
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
  });

  it('should update an existing album', async () => {
    const updateAlbumDto: UpdateAlbumDto = {
      title: 'Updated Album',
    };
    const updatedAlbum = await albumsService.update('1', updateAlbumDto);
    expect(updatedAlbum.title).toBe(updateAlbumDto.title);
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
    const remainingAlbums = mockAlbums.filter((album) => album.id !== '1');
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(remainingAlbums, null, 2),
    );
    expect(usersService.update).toHaveBeenCalledWith('101', {
      albumCount: 1,
    });
  });

  it('should throw an error when trying to remove a non-existent album', async () => {
    await expect(albumsService.remove('999')).rejects.toThrow(
      NotFoundException,
    );
  });
});
