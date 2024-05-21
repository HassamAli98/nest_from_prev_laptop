import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_DB_URL,
      { dbName: 'OAuth' },
    ),
    UsersModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}