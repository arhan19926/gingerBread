import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { jwtConstants } from './constant';
import { CreateUserDto } from '../user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, firstName: user.firstName, lastName: user.lastName };
    console.log(user);
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
    }
  }

  async signup(user: CreateUserDto) {
    try {
      const userPayload = user;
      const result = this.userService.create(
        {
          firstName: userPayload.firstName,
          lastName: userPayload.lastName,
          email: userPayload.email,
        })
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
