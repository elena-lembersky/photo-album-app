// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { ItemsModule } from './modules/items/items.module';
import { LocalStorage } from './common/storage/local.storage';
import { DbStorage } from './common/storage/db.storage';
import { StorageModule } from 'common/storage/storage.module';

@Module({
  imports: [StorageModule, UsersModule, AlbumsModule, ItemsModule],
  providers: [
    {
      provide: 'IStorage',
      useClass: process.env.USE_DB === 'true' ? DbStorage : LocalStorage,
    },
  ],
  exports: ['IStorage'],
})
export class AppModule {}
