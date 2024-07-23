import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async createUser(username: string, password: string): Promise<User> {
    return this.userModel.create({
      username,
      password,
    });
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
  async getUserByUserName(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.getUser({ username });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { name: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
