import { Injectable } from '@nestjs/common';
import { CarsService } from './cars/cars.service';

@Injectable()
export class BootStrapService {
  constructor(private carsService: CarsService) {}

  async bootstrap() {
    await Promise.all([this.carsService.onBootstrap()]);
  }
}
