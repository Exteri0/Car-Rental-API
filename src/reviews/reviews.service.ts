import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';
import { UsersService } from '@/users/users.service';
import { RentalsService } from '@/rentals/rentals.service';
@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewModel: typeof Review,
    private readonly rentalsService: RentalsService,
    private readonly usersService: UsersService,
  ) {}

  private async checkIfUserAndRentalExist(
    createReviewDto: CreateReviewDto,
  ): Promise<void> {
    const { rental_id, user_id } = createReviewDto;
    const [rentalExists, userExists] = await Promise.all([
      this.rentalsService.findOne(rental_id),
      this.usersService.findOne(user_id),
    ]);
    if (!rentalExists) {
      throw new NotFoundException(
        `Rental with ID ${rental_id} does not exist.`,
      );
    }
    if (!userExists) {
      throw new NotFoundException(`User with ID ${user_id} does not exist.`);
    }
  }

  async create(createReviewDto: CreateReviewDto) {
    await this.checkIfUserAndRentalExist(createReviewDto);
    return await this.reviewModel.create({ ...createReviewDto });
  }

  async findAll() {
    return await this.reviewModel.findAll();
  }

  async findOne(id: number) {
    const review = await this.reviewModel.findOne({ where: { id } });
    if (!review) throw new NotFoundException(`Review with ID ${id} not found.`);
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);

    const updatedContent: CreateReviewDto = {
      ...review.toJSON(),
      ...updateReviewDto,
    };
    await this.checkIfUserAndRentalExist(updatedContent);
    return this.reviewModel.update(updatedContent, { where: { id } });
  }

  async remove(id: number) {
    // make sure that it exists first
    const affectedRows = await this.reviewModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    return { message: `Review with ID ${id} has been deleted successfully.` };
  }
}
