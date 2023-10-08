import { Controller, Post, Req, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Change the endpoint to '/register'
  async register(@Res() response, @Body() body: RegisterUserDto): Promise<RegisterUserDto> {
    const newUser = await this.authService.register(body);
    return response.status(HttpStatus.CREATED).json({ newUser });
  }

  @Post('login') // Keep the endpoint as '/login'
  async login(@Body() body: LoginUserDto): Promise<{ accessToken: string }> {
    return await this.authService.login(body);
  }

}
