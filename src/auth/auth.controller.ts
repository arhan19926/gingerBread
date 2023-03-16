import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async signup(@Body() body:CreateUserDto) {
    return this.authService.signup(body);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }



  @Delete('id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
