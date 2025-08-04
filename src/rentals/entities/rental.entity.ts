import { Car } from '@/cars/entities/car.entity';
import { User } from '@/users/entities/user.entity';
import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';

@Table
export class Rental extends Model {
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: 'cars', // Target table name
      key: 'car_id',
    },
  })
  @ForeignKey(() => Car)
  car_id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: 'users', // Target table name
      key: 'id',
    },
  })
  @ForeignKey(() => User)
  user_id: number;

  @Column({
    allowNull: false,
  })
  start_date: Date;

  @Column({
    allowNull: false,
  })
  end_date: Date;

  @Column({
    allowNull: false,
    type: 'ENUM',
    values: ['pending', 'confirmed', 'cancelled', 'active', 'completed'],
  })
  status: 'pending' | 'confirmed' | 'cancelled' | 'active' | 'completed';

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
  })
  total_price: number;

  @Column({
    allowNull: false,
  })
  booking_date: Date;
}
