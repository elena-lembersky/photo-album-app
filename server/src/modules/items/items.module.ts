import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AlbumsModule } from '../albums/albums.module'; // Импортируем AlbumsModule для связи с альбомами
import { StorageModule } from 'common/storage/storage.module';

@Module({
  imports: [AlbumsModule, StorageModule], // Связь с AlbumsModule
  providers: [ItemsService], // Включаем ItemsService
  controllers: [ItemsController], // Включаем ItemsController
  exports: [ItemsService], // Экспортируем ItemsService
})
export class ItemsModule {}
