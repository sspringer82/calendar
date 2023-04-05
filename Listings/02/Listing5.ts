import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Appointment } from './appointments/Appointment';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
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
  providers: [AppService],
})
export class AppModule {}
