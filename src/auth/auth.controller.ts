import { Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('user-auth')
export class UserAuthController {
  constructor(private authService: AuthService) {}
 
  @Get('getUser/:id')
  async getUser(@Param('id') id: string) {
    console.log('called')
    const user = await this.authService.getUserByUserName(id);
    console.log(user)
    if (!user) {
      return {
        message: 'User not found',
      };
    }
    return user;
  }
}


