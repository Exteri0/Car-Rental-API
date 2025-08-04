import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarType } from './entities/car-type.entity';
import { Fuel } from './entities/fuel.entity';
import { Transmission } from './entities/transmission.entity';

@Module({
  imports: [SequelizeModule.forFeature([Car, CarType, Fuel, Transmission])],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService], // Export CarsService and Car model for use in other modules
})
export class CarsModule {}
