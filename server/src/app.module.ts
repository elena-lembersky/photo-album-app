import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { ItemsModule } from '@modules/items/items.module';

@Module({
  imports: [UsersModule, AlbumsModule, ItemsModule],
})
export class AppModule {}
