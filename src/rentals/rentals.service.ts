import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { CarsService } from '@/cars/cars.service';
import { UsersService } from '@/users/users.service';
import { Rental } from './entities/rental.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RentalsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly carsService: CarsService,
    @InjectModel(Rental) private readonly rentalModel: typeof Rental, // Assuming Rental is imported correctly
  ) {}

  private async checkIfUserAndCarExist(
    createRentalDto: CreateRentalDto,
  ): Promise<void> {
    const { car_id, user_id } = createRentalDto;
    const [carExists, userExists] = await Promise.all([
      this.carsService.findOne(car_id),
      this.usersService.findOne(user_id),
    ]);
    if (!carExists) {
      throw new NotFoundException(`Car with ID ${car_id} does not exist.`);
    }
    if (!userExists) {
      throw new NotFoundException(`User with ID ${user_id} does not exist.`);
    }
  }

  async create(createRentalDto: CreateRentalDto) {
    await this.checkIfUserAndCarExist(createRentalDto);
    const rental = await this.rentalModel.create({ ...createRentalDto });
    return rental;
  }

  async findAll() {
    return await this.rentalModel.findAll();
  }

  async findOne(id: number) {
    const rental = await this.rentalModel.findOne({ where: { id } });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found.`);
    }
    return rental;
  }

  async update(id: number, updateRentalDto: UpdateRentalDto) {
    // Check if the rental exists first
    await this.findOne(id);
    // Update the rental with the provided fields
    await this.rentalModel.update(updateRentalDto, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number) {
    const affectedRows = await this.rentalModel.destroy({ where: { id } });
    if (affectedRows === 0) {
      throw new NotFoundException(`Rental with ID ${id} not found.`);
    }
    return { message: `Rental with ID ${id} removed successfully.` };
  }
}
