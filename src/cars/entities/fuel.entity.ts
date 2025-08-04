import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Fuel extends Model {
  @Column({
    type: 'VARCHAR(50)',
    allowNull: false,
    unique: true,
  })
  name: string;
}
