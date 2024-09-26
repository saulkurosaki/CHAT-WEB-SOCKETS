import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [

    UsersModule,
  ],
  exports: [UsersModule],
})
export class AuthModule { }
