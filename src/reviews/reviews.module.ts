import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';
import { RentalsModule } from '@/rentals/rentals.module';
import { UsersModule } from '@/users/users.module';
@Module({
  imports: [SequelizeModule.forFeature([Review]), RentalsModule, UsersModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
