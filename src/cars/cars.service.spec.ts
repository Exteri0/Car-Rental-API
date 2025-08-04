import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { getModelToken } from '@nestjs/sequelize';
import { Car } from './entities/car.entity';
import { CarType } from './entities/car-type.entity';
import { Transmission } from './entities/transmission.entity';
import { Fuel } from './entities/fuel.entity';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getModelToken(Car),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            findByPk: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
        {
          provide: getModelToken(CarType),
          useValue: {
            findOrCreate: jest.fn(),
          },
        },
        {
          provide: getModelToken(Transmission),
          useValue: {
            findOrCreate: jest.fn(),
          },
        },
        {
          provide: getModelToken(Fuel),
          useValue: {
            findOrCreate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
