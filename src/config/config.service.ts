import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI');
  }

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get baseUrl(): string {
    return this.configService.get<string>('BASE_URL');
  }

  get apiPrefix(): string {
    return this.configService.get<string>('API_PREFIX');
  }
}
