import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;
  // TODO: Change it and use aggregation
  @IsNumber()
  @IsNotEmpty()
  type_id: number;
  // TODO: Change it and use aggregation
  @IsNumber()
  @IsNotEmpty()
  transmission_id: number;
  // TODO: Same thing
  @IsNotEmpty()
  @IsNumber()
  fuel_id: number;

  @IsNumber()
  @IsNotEmpty()
  seats: number;

  @IsNotEmpty()
  @IsNumber()
  daily_price: number;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  plate_number: string;

  @IsNumber()
  mileage: number;

  @IsString()
  description: string;

  @IsString()
  image_url: string;
}
