import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Transmission extends Model {
  @Column({
    type: 'VARCHAR(50)',
    allowNull: false,
    unique: true,
  })
  name: string;
}
