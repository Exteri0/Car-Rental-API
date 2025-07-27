import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Transaction extends Model {
  @Column
  amount: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    references: {
      model: 'users', // Target table name
      key: 'id',
    },
  })
  user_id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: 'rentals', // Target table name
      key: 'id',
    },
  })
  rental_id: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM('pending', 'completed', 'failed'),
  })
  status: 'pending' | 'completed' | 'failed';

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  transaction_date: Date;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  payment_method: string;
}
