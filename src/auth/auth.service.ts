import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository'
import { User } from './entities/user.entity'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) 
  private readonly authRepository: AuthRepository,
  private jwtService: JwtService
) {}

  async register(data: RegisterUserDto): Promise<User> {
    return this.authRepository.register(data)
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string}> {

    const res = this.authRepository.validateUserPassword(loginUserDto)

    if (!res) throw new UnauthorizedException('Invalid credentials')

    const { email } = loginUserDto

    const payload: JwtPayload = { email }

    const accessToken = this.jwtService.sign(payload)

    return { accessToken }

  }
}
