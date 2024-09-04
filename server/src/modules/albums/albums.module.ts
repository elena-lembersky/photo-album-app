// src/modules/albums/albums.module.ts
import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { UsersModule } from '../users/users.module';
import { StorageModule } from 'common/storage/storage.module';

@Module({
  imports: [StorageModule, UsersModule],
  providers: [AlbumsService],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
