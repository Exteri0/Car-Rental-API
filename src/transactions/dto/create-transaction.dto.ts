import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsPositive,
} from 'class-validator';

export class CreateTransactionDto {
  // This should be calculated by the server based on the rental
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

  // This should come from the authenticated user (e.g. JWT payload)
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  user_id: number;
}
