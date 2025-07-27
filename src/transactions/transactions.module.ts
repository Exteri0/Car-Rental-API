import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { UsersService } from '@/users/users.service';
import { RentalsService } from '@/rentals/rentals.service';
@Module({
  imports: [
    SequelizeModule.forFeature([Transaction]),
    UsersService,
    RentalsService,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
