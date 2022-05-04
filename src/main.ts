import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  utilities,
  WinstonModule,
  WINSTON_MODULE_NEST_PROVIDER,
} from 'nest-winston';
import * as winston from 'winston';
import { TransformInterceptor } from './application/interceptors/transformInterceptors';
import { RootModule } from './rootModule.module';

async function bootstrap() {
  //enabling winston logger for bootstrapping
  const app = await NestFactory.create(RootModule, {
    logger: WinstonModule.createLogger({
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
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
