
  import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  
  async getUserByUserName(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }
}
