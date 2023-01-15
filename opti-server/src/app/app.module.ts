import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './../cars/cars.module';
import { BootStrapService } from 'src/bootstrap.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_DB,
      }),
    }),
    CarsModule,
  ],
  controllers: [AppController],
  providers: [AppService, BootStrapService],
})
export class AppModule {}
