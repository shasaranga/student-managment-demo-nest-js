import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './application/app.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./envs/${process.env.STAGE}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          entities: [__dirname + './**/*.entity{.ts,.js}'],
        };
      },
    }),
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [
          new winston.transports.Console({ level: 'error' }),
          new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              utilities.format.nestLike('Student_Managment_API', {
                prettyPrint: true,
              }),
            ),
          }),
        ],
      }),
    }),
    AppModule,
  ],
  exports: [TypeOrmModule],
})
export class RootModule {}
