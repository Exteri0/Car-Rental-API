import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
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
