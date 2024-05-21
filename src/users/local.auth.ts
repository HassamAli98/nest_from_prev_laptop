import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private UsersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.UsersService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
