import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAuctionDto {
  @IsNumber()
  public id: number;

  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  public nftAddress: string;

  // Gets only validated if it's part of the request's body
  @IsString()
  @IsNotEmpty()
  public startDate: Date;

  @IsString()
  @IsNotEmpty()
  public endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  public Likes: number;

  public user;
}