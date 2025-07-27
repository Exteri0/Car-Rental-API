import {
  IsNumber,
  IsDate,
  IsString,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateRentalDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  car_id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  user_id: number;

  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  total_price: number;

  @IsDate()
  @IsNotEmpty()
  booking_date: Date;
}
