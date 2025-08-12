import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  // Checking if the input already exists

  private async validateUniqueFields(
    userData: {
      email?: string;
      phone_number?: string;
      driver_license_number?: string;
    },
    excludeId?: number,
  ): Promise<void> {
    const whereConditions: Array<{ [key: string]: string }> = [];

    if (userData.email) {
      whereConditions.push({ email: userData.email });
    }

    if (userData.phone_number) {
      whereConditions.push({ phone_number: userData.phone_number });
    }

    if (userData.driver_license_number) {
      whereConditions.push({
        driver_license_number: userData.driver_license_number,
      });
    }

    if (whereConditions.length === 0) return;

    const whereClause: { [key: string]: any } = { [Op.or]: whereConditions };

    // Exclude current user ID for updates
    if (excludeId) {
      whereClause.id = { [Op.ne]: excludeId };
    }

    const existingUser = await this.userModel.findOne({
      where: whereClause,
    });

    if (existingUser) {
      const existingData: User = existingUser.toJSON();

      if (userData.email && existingData.email === userData.email) {
        throw new ConflictException(
          `User with email ${userData.email} already exists`,
        );
      }

      if (
        userData.phone_number &&
        existingData.phone_number === userData.phone_number
      ) {
        throw new ConflictException(
          `User with phone number ${userData.phone_number} already exists`,
        );
      }

      if (
        userData.driver_license_number &&
        existingData.driver_license_number === userData.driver_license_number
      ) {
        throw new ConflictException(
          `User with driver license ${userData.driver_license_number} already exists`,
        );
      }
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateUniqueFields({
      email: createUserDto.email,
      phone_number: createUserDto.phone_number,
      driver_license_number: createUserDto.driver_license_number,
    });
    const password_hash = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await this.userModel.create<User>({
      ...createUserDto,
      password_hash,
    });
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userModel.findOne({ where: { id } });
      if (!user) throw new NotFoundException(`User with id ${id} not found`);
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`, {
        cause: error,
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`, {
        cause: new Error(`User with id ${id} not found`),
        description: 'The user you are trying to update does not exist.',
      });
    }
    await this.validateUniqueFields(
      {
        email: updateUserDto.email,
        phone_number: updateUserDto.phone_number,
        driver_license_number: updateUserDto.driver_license_number,
      },
      id,
    );

    if (updateUserDto.password) {
      const password_hash = await bcrypt.hash(updateUserDto.password, 10);
      const newUserDto = { ...updateUserDto, password_hash };
      delete newUserDto.password; // Remove password from DTO
      await this.userModel.update(newUserDto, { where: { id } });
    } else await this.userModel.update(updateUserDto, { where: { id } });
    return this.findOne(id);
  }

  // yes im trying this out
  async remove(id: number): Promise<void> {
    try {
      const deletedRowCount = await this.userModel.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        throw new NotFoundException(`User with id ${id} not found`, {
          description: 'The user you are trying to delete does not exist.',
        });
      }
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`, {
        cause: error,
        description: 'The user you are trying to delete does not exist.',
      });
    }
  }

  // for login, we need to include password
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel
      .scope('withPassword')
      .findOne({ where: { email } });
  }
}
