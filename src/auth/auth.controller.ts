import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserPublic } from '@/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthUser } from '@/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  login(@AuthUser() user: UserPublic) {
    return this.authService.login(user);
  }
}
