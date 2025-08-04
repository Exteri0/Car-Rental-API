import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  IsPositive,
  IsOptional,
} from 'class-validator';
export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1900)
  @Max(2025)
  year: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  transmission: string;

  @IsString()
  @IsNotEmpty()
  fuel: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  seats: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
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
  @Min(0)
  @IsOptional()
  mileage: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  image_url: string;
}
