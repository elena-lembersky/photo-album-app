// src/modules/albums/albums.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IStorage } from 'common/interfaces/i-storage.interface';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './albums.interface';
import { UsersService } from '@modules/users/users.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject('IStorage') private storage: IStorage,
    private readonly usersService: UsersService,
  ) {}

  private readonly filePath = '../../../data/albums.json';

  async findAll(): Promise<Album[]> {
    return await this.storage.read<Album[]>(this.filePath);
  }

  async findOne(id: string): Promise<Album> {
    const albums = await this.findAll();
    const album = albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException(`Album with id: ${id} not found`);
    return album;
  }

  async findByUserId(userId: string): Promise<Album[]> {
    const albums = await this.findAll();
    return albums.filter((album) => album.userId === userId);
  }

  async create(userId: string, createAlbumDto: CreateAlbumDto): Promise<Album> {
    const albums = await this.findAll();
    const newAlbum: Album = {
      id: uuidv4(),
      userId,
      ...createAlbumDto,
      coverImage: null,
    };
    albums.push(newAlbum);
    await this.storage.write(this.filePath, albums);

    // Update user's album count
    const user = await this.usersService.findOne(userId);
    await this.usersService.update(userId, {
      albumCount: user.albumCount + 1, // Increment album count
    });

    return newAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const albums = await this.findAll();
    const albumIndex = albums.findIndex((album) => album.id === id);
    if (albumIndex === -1)
      throw new NotFoundException(`Album with id: ${id} not found`);
    const updatedAlbum = { ...albums[albumIndex], ...updateAlbumDto };
    albums[albumIndex] = updatedAlbum;
    await this.storage.write(this.filePath, albums);
    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    const albums = await this.findAll();
    const album = albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException(`Album with id: ${id} not found`);

    const updatedAlbums = albums.filter((album) => album.id !== id);
    await this.storage.write(this.filePath, updatedAlbums);

    // Update user's album count
    const user = await this.usersService.findOne(album.userId);
    await this.usersService.update(album.userId, {
      albumCount: user.albumCount - 1, // Decrement album count
    });
  }
}
