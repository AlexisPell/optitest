import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, isValidObjectId } from 'mongoose';
import { Car, CarDocument } from './car.schema';
import { cars } from './data/default';
import { CreateCarDto } from './dto/createCar.dto';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  // Fill database with default cars if they don't exist
  async onBootstrap() {
    const count = await this.carModel.count();
    console.log('HERE???', count);
    if (count === 0) {
      const res = await this.carModel.insertMany(cars);
      console.log('RES', res);
    }
  }

  async getCars({ from, to }: { from: number; to: number }) {
    const aggregation: PipelineStage[] = [{ $skip: from }, { $limit: to }];

    return await this.carModel.aggregate(aggregation);
  }

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    const car = await this.carModel.create({ ...createCarDto });

    return car.toObject();
  }

  async deleteCarById(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid id');

    const removed = await this.carModel.findByIdAndDelete(id);

    if (!removed) return false;

    return true;
  }
}
