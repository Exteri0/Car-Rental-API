import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { UsersService } from '@/users/users.service';
import { RentalsService } from '@/rentals/rentals.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
    private readonly usersService: UsersService,
    private readonly rentalsService: RentalsService,
  ) {}

  private async checkIfUserAndRentalExist(
    createTransactionDto: CreateTransactionDto,
  ): Promise<void> {
    const { rental_id, user_id } = createTransactionDto;
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

  async create(createTransactionDto: CreateTransactionDto) {
    await this.checkIfUserAndRentalExist(createTransactionDto);
    const transaction = await this.transactionModel.create({
      ...createTransactionDto,
    });
    return transaction;
  }

  async findAll() {
    return this.transactionModel.findAll();
  }

  async findOne(id: number) {
    const transaction = await this.transactionModel.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found.`);
    }
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    await this.transactionModel.update(updateTransactionDto, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);
    if (transaction) {
      await this.transactionModel.destroy({ where: { id } });
    }
    return transaction;
  }
}
