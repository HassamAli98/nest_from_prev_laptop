import { Module } from '@nestjs/common';
import { UserAuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from 'src/users/users.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),],
  providers: [AuthService],
  controllers: [UserAuthController],
})
export class AuthModule {}
