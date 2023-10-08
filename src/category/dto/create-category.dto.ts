import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  public id: number;

  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  public name: string;

  // Gets only validated if it's part of the request's body
  @IsString()
  @IsNotEmpty()
  public imageUrl: string;
  user: import("c:/Users/user/Documents/xchng/src/auth/entities/user.entity").User;

  // Add any other properties related to the category here
}
