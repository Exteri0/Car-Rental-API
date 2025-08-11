import { Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(loginAuthDto.email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(
      loginAuthDto.password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}
