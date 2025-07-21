import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';
import { User } from '../users/entities/user.entity';
import { Car } from '../cars/entities/car.entity';
import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [User, Car],
      logging: console.log,
      define: {
        underscored: true,
        timestamps: true,
      },
      synchronize: true,
      sync: {
        // force: process.env.NODE_ENV === 'development',
        alter: process.env.NODE_ENV === 'development',
      }, // This will drop and recreate tables every time
      autoLoadModels: true,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
