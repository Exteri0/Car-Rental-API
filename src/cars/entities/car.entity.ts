import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Car extends Model {
  @Column({
    type: 'INTEGER',
    autoIncrement: true,
    primaryKey: true,
  })
  car_id: number;

  @Column({
    type: 'VARCHAR(50)',
    allowNull: false,
  })
  make: string;

  @Column({
    type: 'VARCHAR(50)',
    allowNull: false,
  })
  model: string;

  @Column({
    type: 'INTEGER',
    allowNull: false,
  })
  year: number;

  @Column({
    type: 'INTEGER',
    allowNull: false,
  })
  type_id: number;

  @Column({
    type: 'INTEGER',
    allowNull: false,
  })
  transmission_id: number;

  @Column({
    type: 'INTEGER',
    allowNull: false,
  })
  fuel_id: number;

  @Column({
    type: 'INTEGER',
    allowNull: false,
  })
  seats: number;

  @Column({
    type: 'DECIMAL(10,2)',
    allowNull: false,
  })
  daily_price: number;

  @Column({
    type: 'BOOLEAN',
    allowNull: false,
    defaultValue: true,
  })
  available: boolean;

  @Column({
    type: 'VARCHAR(30)',
    allowNull: false,
  })
  color: string;

  @Column({
    type: 'VARCHAR(20)',
    allowNull: false,
    unique: true,
  })
  plate_number: string;

  @Column({
    type: 'INTEGER',
    allowNull: true,
  })
  mileage: number;

  @Column({
    type: 'TEXT',
    allowNull: true,
  })
  description: string;

  @Column({
    type: 'VARCHAR(255)',
    allowNull: true,
  })
  image_url: string;
}
