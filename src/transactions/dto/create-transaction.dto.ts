import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsPositive,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @IsEnum(['pending', 'completed', 'failed'])
  @IsNotEmpty()
  status: 'pending' | 'completed' | 'failed';

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  rental_id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  user_id: number;
}
