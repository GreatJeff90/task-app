import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateNotificationDto {
  @IsNumber()
  public id: number;

  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  public title: string;

  // Gets only validated if it's part of the request's body
  @IsString()
  @IsNotEmpty()
  public body: Date;

  public user;
  property1: any;
}