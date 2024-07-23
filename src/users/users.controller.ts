import { Body, Controller, Get, HttpStatus, Param, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
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
