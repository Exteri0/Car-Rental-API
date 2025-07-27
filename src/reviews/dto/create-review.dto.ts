import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  rental_id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  user_id: number;
}
