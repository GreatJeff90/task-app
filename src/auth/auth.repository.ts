import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    return this.authRepository.register(registerUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { walletAddress } = loginUserDto;
    const userExists = await this.authRepository.userExists({ walletAddress });

    if (!userExists) {
      throw new NotFoundException(`User with wallet address: ${walletAddress} not found`);
    }

    // Generate and return an access token
    const accessToken = 'generate_your_access_token_here'; // Replace with actual token generation logic

    return { accessToken };
  }
}

interface AuthRepository extends Repository<User> {
  register(data: RegisterUserDto): Promise<User>;
  userExists({ walletAddress }): Promise<boolean>;
}

const CustomAuthRepository: Pick<AuthRepository, any> = {
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    return this.save(registerUserDto);
  },

  async userExists({ walletAddress }): Promise<boolean> {
    const found = await this.findOne({ walletAddress });

    return !!found;
  },
};
