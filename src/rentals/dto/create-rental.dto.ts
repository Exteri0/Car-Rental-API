import {
  IsNumber,
  IsDate,
  IsNotEmpty,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRentalDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  car_id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  user_id: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @IsEnum(['pending', 'confirmed', 'cancelled', 'active', 'completed'])
  @IsNotEmpty()
  status: 'pending' | 'confirmed' | 'cancelled' | 'active' | 'completed';

  // This should be calculated by the server based on car's daily_price and rental duration
  @IsNumber()
  @IsNotEmpty()
  total_price: number;

  // This should be set by the server upon creation
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  booking_date: Date;
}
