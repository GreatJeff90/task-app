// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  jwtService: any;
  userService: any;
  // ... other methods and dependencies

  async register(userData: RegisterUserDto): Promise<User> {
    // Create a new user with the provided wallet address
    const newUser = await this.userService.createUser(userData.walletAddress);
    // ... other registration logic
    return newUser;
  }

  async login(loginData: LoginUserDto): Promise<{ accessToken: string }> {
    // Authenticate the user using the provided wallet address
    const user = await this.userService.findByWalletAddress(loginData.walletAddress);

    // If user is found, generate and return an access token
    if (user) {
      const accessToken = this.jwtService.sign({ sub: user.id });
      return { accessToken };
    }

    // Handle authentication failure (user not found)
    throw new UnauthorizedException('Invalid wallet address');
  }
}
