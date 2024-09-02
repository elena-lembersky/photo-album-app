import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UsersService } from '../users/users.service';
import type { User } from '../users/users.interface';
import { Album } from './albums.interface';

@Injectable()
export class AlbumsService {
  private readonly dataPath = path.resolve(
    __dirname,
    '../../../data/albums.json',
  );

  constructor(private readonly usersService: UsersService) {}

  async findAll(): Promise<Album[]> {
    try {
      const data = await fs.promises.readFile(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Failed to read albums data');
    }
  }

  async getUserByID(userId: string): Promise<User> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async findByUserId(userId: string): Promise<Album[]> {
    //TODO add validation userId
    const albums = await this.findAll();
    return albums.filter((album) => album.userId === userId);
  }

  async findOne(albumId: string): Promise<Album> {
    const albums = await this.findAll();
    const album = albums.find((album) => album.id === albumId);
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }
    return album;
  }

  async create(userId: string, createAlbumDto: CreateAlbumDto): Promise<Album> {
    const albums = await this.findAll();
    const user = await this.getUserByID(userId);
    const newAlbum: Album = {
      id: uuidv4(),
      userId: user.id,
      title: createAlbumDto.title,
      coverImage: null,
    };
    albums.push(newAlbum);
    await this.saveAlbums(albums);
    await this.updateUserAlbumCount(userId, 1);
    return newAlbum;
  }

  async update(
    albumId: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    //TODO use findOne after moving to DB
    const albums = await this.findAll();
    const albumIndex = albums.findIndex((album) => album.id === albumId);

    if (albumIndex === -1) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }

    const updatedAlbum = {
      ...albums[albumIndex],
      ...updateAlbumDto,
    };
    albums[albumIndex] = updatedAlbum;
    await this.saveAlbums(albums);
    return updatedAlbum;
  }

  async remove(albumId: string): Promise<void> {
    const albums = await this.findAll();
    const albumIndex = albums.findIndex((album) => album.id === albumId);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }
    const [removedAlbum] = albums.splice(albumIndex, 1);
    await this.saveAlbums(albums);
    await this.updateUserAlbumCount(removedAlbum.userId, -1);
  }

  private async saveAlbums(albums: Album[]): Promise<void> {
    await fs.promises.writeFile(this.dataPath, JSON.stringify(albums, null, 2));
  }

  private async updateUserAlbumCount(
    userId: string,
    delta: number,
  ): Promise<void> {
    const user = await this.getUserByID(userId);
    user.albumCount = (user.albumCount || 0) + delta;
    await this.usersService.update(userId, { albumCount: user.albumCount });
  }
}
