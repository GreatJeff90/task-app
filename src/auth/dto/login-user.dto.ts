
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class LoginUserDto {

  @IsString()
  @IsNotEmpty()
  public walletAddress: string;

}