import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService], // Export CarsService and Car model for use in other modules
})
export class CarsModule {}
