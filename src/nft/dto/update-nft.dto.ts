import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class UpdateNftDto {
  @IsNumber()
  public id: number

  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  public solanaPrice: number;
  
  @IsNumber()
  @IsNotEmpty()
  usdPrice: number;

  // Gets only validated if it's part of the request's body
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  categories: Category[];

  public user
}