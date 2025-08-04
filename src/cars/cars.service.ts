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
import { CarType } from './entities/car-type.entity';
import { Transmission } from './entities/transmission.entity';
import { Fuel } from './entities/fuel.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car) private readonly carModel: typeof Car,
    @InjectModel(CarType) private readonly carTypeModel: typeof CarType,
    @InjectModel(Transmission)
    private readonly transmissionModel: typeof Transmission,
    @InjectModel(Fuel) private readonly fuelModel: typeof Fuel,
  ) {}

  // TODO: Implement upload image before putting the url in the database
  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = await this.carModel.findOne({
      where: { plate_number: createCarDto.plate_number },
    });
    if (car)
      throw new ConflictException(
        `Car with plate number ${createCarDto.plate_number} already exists`,
      );

    const [carType] = await this.carTypeModel.findOrCreate({
      where: { name: createCarDto.type },
    });
    const [transmission] = await this.transmissionModel.findOrCreate({
      where: { name: createCarDto.transmission },
    });
    const [fuel] = await this.fuelModel.findOrCreate({
      where: { name: createCarDto.fuel },
    });

    const carData = {
      ...createCarDto,
      type_id: carType.id,
      transmission_id: transmission.id,
      fuel_id: fuel.id,
    };

    const createdCar = await this.carModel.create<Car>(carData);
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
