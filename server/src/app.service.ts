import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Gallery Management API!';
  }

  checkHealth(): string {
    return 'Everything is OK!';
  }
}
