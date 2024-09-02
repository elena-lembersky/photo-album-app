import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './albums.interface';

@Controller()
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  // GET /albums
  @Get('/albums')
  async findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  // GET /users/:userId/albums
  @Get('users/:userId/albums')
  async findAlbumsByUser(@Param('userId') userId: string): Promise<Album[]> {
    return this.albumsService.findByUserId(userId);
  }

  // GET /albums/:albumId
  @Get('albums/:albumId')
  async findOne(@Param('albumId') albumId: string): Promise<Album> {
    return this.albumsService.findOne(albumId);
  }

  // POST /users/:userId/albums
  @Post('users/:userId/albums')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createForUser(
    @Param('userId') userId: string,
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.create(userId, createAlbumDto);
  }

  // PUT /albums/:albumId
  @Put('albums/:albumId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('albumId') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.update(albumId, updateAlbumDto);
  }

  // DELETE /albums/:albumId
  @Delete('albums/:albumId')
  async delete(@Param('albumId') albumId: string): Promise<void> {
    await this.albumsService.remove(albumId);
  }
}
