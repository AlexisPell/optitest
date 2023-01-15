import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Car } from './car.schema';
import { CarsService } from './cars.service';
import { CreateCarDto, CreateCarDtoResult } from './dto/createCar.dto';
import { DeleteCarDto } from './dto/deleteCar.dto';
import { GetAllCarsDtoResult } from './dto/getAllCars.dto';

@Controller('cars')
@ApiTags('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cars' })
  @ApiOkResponse({ type: [Car] })
  async getCars(
    @Query()
    { from = 0, to = 10 }: { from: number; to: number },
  ) {
    const cars = await this.carsService.getCars({
      from: Number(from),
      to: Number(to),
    });

    return cars.map((c) => new GetAllCarsDtoResult(c));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiOkResponse({ type: CreateCarDtoResult })
  async createCar(@Body() data: CreateCarDto) {
    const createdCar = await this.carsService.createCar(data);

    return new CreateCarDtoResult(createdCar);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete car by id' })
  @ApiOkResponse({ type: 'Boolean' })
  async deleteCar(@Param() { id }: DeleteCarDto) {
    const removed = await this.carsService.deleteCarById(id);
    return removed;
  }
}
