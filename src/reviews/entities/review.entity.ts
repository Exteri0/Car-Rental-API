import {
  Model,
  Table,
  DataType,
  Column,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Rental } from '@/rentals/entities/rental.entity';

@Table
export class Review extends Model {
  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rating: number;

  @ForeignKey(() => Rental)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'rentals', // Target table name
      key: 'id', // Target column name
    },
  })
  rental_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Target table name
      key: 'id', // Target column name
    },
  })
  user_id: number;
}
