import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  imports: [UsersModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
