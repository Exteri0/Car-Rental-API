import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  create(@Request() req): User {
    return req.user as User;
  }
  @Post()
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.validateUser(loginAuthDto);
  }
}
