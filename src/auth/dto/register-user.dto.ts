
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsEmpty, } from 'class-validator'

export class RegisterUserDto {

  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public salt: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}