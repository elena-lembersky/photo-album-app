import { Module } from '@nestjs/common';
import { LocalStorage } from './local.storage';

@Module({
  providers: [
    {
      provide: 'IStorage',
      useClass: LocalStorage,
    },
  ],
  exports: ['IStorage'],
})
export class StorageModule {}
