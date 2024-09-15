import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService
  ) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById( @Param('id', new ParseUUIDPipe({ version: '4' }) ) id: string ) {
    console.log(this.carsService[id])
    return this.carsService.finOneById( id ); 
  }

  @Post()
  createCar( @Body() createCar: CreateCarDto ) {
    return this.carsService.create(createCar);
  }

  @Patch(':id')
  updateCar( 
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCar: UpdateCarDto 
  ) {
    return this.carsService.update( id, updateCar );
  }

  @Delete()
  deleteCar(@Param('id', ParseUUIDPipe) id: string ) {
    return this.carsService.delete( id );
  }
}
