import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@/users/entities/user.entity';
import { Plain } from '@/common/types/plain.types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthUser } from '@/common/decorators/User.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  login(@AuthUser() user: Plain<User>): Plain<User> {
    return user;
  }
}
