import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';
import { User } from '../users/entities/user.entity';
import { Car } from '../cars/entities/car.entity';
import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { Review } from '@/reviews/entities/review.entity';
import { Rental } from '@/rentals/entities/rental.entity';
import { Transmission } from '@/cars/entities/transmission.entity';
import { Fuel } from '@/cars/entities/fuel.entity';
import { Transaction } from '@/transactions/entities/transaction.entity';
import { CarType } from '@/cars/entities/car-type.entity';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [
        User,
        Car,
        Review,
        Rental,
        Transmission,
        Fuel,
        Transaction,
        CarType,
      ],
      logging: console.log,
      define: {
        underscored: true,
        timestamps: true,
      },
      synchronize: true,
      sync: {
        // force: process.env.NODE_ENV === 'development',
        // alter: process.env.NODE_ENV === 'development',
      }, // This will drop and recreate tables every time
      autoLoadModels: true,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
