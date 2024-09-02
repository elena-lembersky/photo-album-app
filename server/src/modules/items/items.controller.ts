import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.interface';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/items')
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get('/albums/:albumId/items')
  async findItemsByAlbumId(@Param('albumId') albumId: string) {
    return this.itemsService.findByAlbumId(albumId);
  }

  @Get('items/:itemId')
  async findOne(@Param('itemId') itemId: string) {
    return this.itemsService.findOne(itemId);
  }

  @Post('/albums/:albumId/items')
  async create(
    @Param('albumId') albumId: string,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemsService.create(albumId, createItemDto);
  }

  @Put('items/:itemId')
  async update(
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.update(itemId, updateItemDto);
  }

  @Delete('items/:itemId')
  async remove(@Param('itemId') itemId: string) {
    return this.itemsService.remove(itemId);
  }
}
