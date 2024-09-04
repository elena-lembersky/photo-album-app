// src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { StorageModule } from 'common/storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [UsersService], // Включаем UsersService
  controllers: [UsersController], // Включаем UsersController
  exports: [UsersService], // Экспортируем UsersService для использования в других модулях
})
export class UsersModule {}
