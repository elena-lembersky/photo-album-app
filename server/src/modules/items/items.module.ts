import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AlbumsModule } from '../albums/albums.module'; // Импортируем AlbumsModule для связи с альбомами
import { StorageModule } from 'common/storage/storage.module';

@Module({
  imports: [AlbumsModule, StorageModule],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
