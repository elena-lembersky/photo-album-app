import { Module } from '@nestjs/common';
import { AlbumsModule } from '@modules/albums/albums.module';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [AlbumsModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
