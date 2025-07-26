import { Column, Table, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: 'VARCHAR(255)',
    allowNull: false,
  })
  name: string;

  @Column({
    type: 'VARCHAR(255)',
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'VARCHAR(255)',
    allowNull: false,
  })
  password_hash: string;

  @Column({
    type: 'VARCHAR(255)',
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @Column({
    type: 'VARCHAR(255)',
    allowNull: false,
    unique: true,
  })
  driver_license_number: string;
}
