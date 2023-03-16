import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleSignIn(@Req() req) {

  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req) {
    return this.authService.gooogleLogin(req);
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
