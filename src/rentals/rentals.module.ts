import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { Rental } from './entities/rental.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from '@/users/users.service';
import { CarsService } from '@/cars/cars.service';

@Module({
  imports: [SequelizeModule.forFeature([Rental]), UsersService, CarsService],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService],
})
export class RentalsModule {}
