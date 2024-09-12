import { BadRequestException, Injectable } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Chevrolet',
      model: 'Cruze'
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic'
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla'
    }
  ];

  findAll() {
    return this.cars;
  }

  finOneById(id: string) {
    const car = this.cars.find(car => car.id === id);

    return car;
  }

  create( createCar: CreateCarDto ) {
    const newCar: Car = {
      id: uuid(),
      ...createCar
    }

    this.cars.push(newCar);
    return newCar;
  }

  update( id: string, updateCar: UpdateCarDto ) {
    let carDB = this.finOneById(id);

    if (updateCar.id && updateCar.id !== id)
      throw new BadRequestException(`Car id is no valid inside body`)

    this.cars = this.cars.map( car => {
      if ( car.id === id ) {
        carDB = {
          ...carDB,
          ...updateCar,
          id
        }

        return carDB;
      }
      return car;
    })
    return carDB;
  }
}
