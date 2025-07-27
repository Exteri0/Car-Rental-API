import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';
import { UsersService } from '@/users/users.service';
import { RentalsService } from '@/rentals/rentals.service';
@Module({
  imports: [SequelizeModule.forFeature([Review]), RentalsService, UsersService],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
