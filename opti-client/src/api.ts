import axios from 'axios';
import { CARS_API } from './constants';
import { ICar } from './interfaces';

class CarsApi {
  public async getCars(): Promise<ICar[]> {
    try {
      const { data: carsList } = await axios.get<ICar[]>(`${CARS_API}/cars`);
      return carsList;
    } catch (error) {
      return [];
    }
  }

  public async createCar(carDto: ICar): Promise<ICar | Error> {
    const { data: newCar } = await axios.post<ICar>(`${CARS_API}/cars`, carDto);
    return newCar;
  }

  public async deleteCarById(id: string): Promise<boolean | string> {
    let removed = false;
    let err = '';
    try {
      const { data } = await axios.delete<boolean>(`${CARS_API}/cars/${id}`);
      removed = data;
    } catch (error) {
      err = (error as any).response.data.message;
    }
    return removed || err;
  }
}
export const carsApi = new CarsApi();
