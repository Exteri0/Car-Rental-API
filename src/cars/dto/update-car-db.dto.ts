import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDbDto extends PartialType(CreateCarDto) {
  transmission_id?: string;
  fuel_id?: string;
  type_id?: string;
}
