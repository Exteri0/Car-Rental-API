import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { Rental } from './entities/rental.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '@/users/users.module';
import { CarsModule } from '@/cars/cars.module';

@Module({
  imports: [SequelizeModule.forFeature([Rental]), UsersModule, CarsModule],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService],
})
export class RentalsModule {}
