import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constant';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,
    JwtStrategy, UserService, JwtService, UserRepository],
  exports: [AuthService]
})
export class AuthModule { }
