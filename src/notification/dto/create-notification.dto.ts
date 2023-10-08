import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
@IsNumber()
public id: number

  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  public title: string;

  // Gets only validated if it's part of the request's body
  @IsString()
  @IsNotEmpty()
  public body: string;

  public user
  property1: any;
}