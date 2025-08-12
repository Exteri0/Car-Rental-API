import { Plain } from '@/common/types/plain.types';
import { Column, Table, Model, Scopes } from 'sequelize-typescript';

@Scopes(() => ({
  defaultScope: {
    attributes: { exclude: ['password_hash'] },
  },
  withPassword: {
    attributes: { include: ['password_hash'] },
  },
}))
@Table
export class User extends Model {
  declare id: number;

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

export type UserWithPassword = Plain<User>;

export type UserPublic = Omit<UserWithPassword, 'password_hash'>;
