import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

type UserCredentials = {
  username: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userCredentials: UserCredentials) {
    return this.authService.login(
      userCredentials.username,
      userCredentials.password,
    );
  }
}
