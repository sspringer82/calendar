import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUser, User } from './User';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  register(@Body() newUser: CreateUser): Promise<User> {
    if (newUser.password !== newUser.repeatPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    return this.usersService.create(newUser);
  }
}
