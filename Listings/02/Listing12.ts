import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ConfigModule.forRoot(),
    AppointmentsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('HOST', '127.0.0.1'),
          port: configService.get('PORT', 3306),
          username: configService.get('USERNAME'),
          password: configService.get('PASSWORD'),
          database: configService.get('DATABASE', 'calendar'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
