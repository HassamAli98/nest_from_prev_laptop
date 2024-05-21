import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() body) {
    const user = await this.usersService.getUserByUserName(body.username);
    return this.usersService.login(user);
  }
}
