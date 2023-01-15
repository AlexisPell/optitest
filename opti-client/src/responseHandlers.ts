import * as readline from 'readline';
import { carsApi } from './api';
import { OUTPUT_MSGS } from './constants';
import { ICar } from './interfaces';

export class ResponseHandlers {
  rl: readline.Interface;
  constructor(rl: readline.Interface) {
    this.rl = rl;
  }

  public async handleGetCars() {
    const cars = await carsApi.getCars();
    this.rl.write(JSON.stringify(cars) + '\n\n' + OUTPUT_MSGS.INSTRUCTIONS);
  }

  public async handleCreateCar(carDtoInput: string) {
    let carDto = {} as ICar;
    try {
      carDto = JSON.parse(carDtoInput);
    } catch (error) {
      this.rl.write('Incorrect JSON. Please, fix syntax \n');
    }

    if (!carDto.name || !carDto.brand || !carDto.price || !carDto.yearCreated) {
      this.rl.write(
        `Sorry, not all necessary fields are provided. Your car input: ${JSON.stringify(carDto)} \n`
      );
    }

    const newCar = await carsApi.createCar(carDto);
    this.rl.write(JSON.stringify(newCar) + '\n\n' + OUTPUT_MSGS.INSTRUCTIONS);
  }

  public async handleDeleteCarById(id: string) {
    const res = await carsApi.deleteCarById(id);
    if (typeof res === 'boolean') this.rl.write(`Car with id ${id} was removed \n\n`);
    if (typeof res === 'string') this.rl.write(`Error removing car: ${res} \n\n`);
  }
}
