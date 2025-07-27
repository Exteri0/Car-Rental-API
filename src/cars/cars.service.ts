import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car) private readonly carModel: typeof Car) {}

  // TODO: Implement upload image before putting the url in the database
  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = await this.carModel.findOne({
      where: { plate_number: createCarDto.plate_number },
    });
    if (car)
      throw new ConflictException(
        `Car with plate number ${createCarDto.plate_number} already exists`,
      );
    const createdCar = await this.carModel.create<Car>({ ...createCarDto });
    return createdCar;
  }

  async findAll(): Promise<Car[]> {
    return await this.carModel.findAll();
  }

  async findOne(id: number): Promise<Car | null> {
    const car = await this.carModel.findByPk(id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    // check if the id exists first
    await this.findOne(id);
    // check if the plate number already exists somewhere else
    if (updateCarDto.plate_number) {
      const potentialConflictCar = await this.carModel.findOne({
        where: {
          plate_number: updateCarDto.plate_number,
          car_id: { [Op.ne]: id },
        },
      });
      if (potentialConflictCar)
        throw new ConflictException(
          `Car with plate number ${updateCarDto.plate_number} already exists`,
        );
    }
    await this.carModel.update(updateCarDto, {
      where: { id },
    });
    const updatedCar: Car = (await this.findOne(id)) as unknown as Car;
    return updatedCar;
  }

  async remove(id: number): Promise<number> {
    //check if the id exists
    const car = await this.findOne(id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return await this.carModel.destroy({ where: { id } });
  }
}
