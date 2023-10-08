
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsEmpty, } from 'class-validator'

export class RegisterUserDto {

  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public walletAddress: string;

  @IsString()
  @IsNotEmpty()
  public preferredWallet: string;

  @IsString()
  @IsNotEmpty()
  public avatarUrl: string;
}