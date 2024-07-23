import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.auth';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '2h' },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [UsersService, LocalStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
