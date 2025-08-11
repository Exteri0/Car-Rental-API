import { Module } from '@nestjs/common';
import { AdminController, AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CarsModule } from './cars/cars.module';
import { RentalsModule } from './rentals/rentals.module';
import { ReviewsModule } from './reviews/reviews.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    RentalsModule,
    CarsModule,
    TransactionsModule,
    ReviewsModule,
    AuthModule,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
