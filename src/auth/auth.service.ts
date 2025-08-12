import { Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { UserPublic } from '@/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MyJwtPayload } from './types/jwt-payload.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(loginAuthDto.email);
    if (!user) {
      return null;
    }
    console.log('found this user before bcrypting', user);
    const isPasswordValid = await bcrypt.compare(
      loginAuthDto.password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      return null;
    }
    // Exclude password_hash before returning user
    const { password_hash, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  login(user: UserPublic) {
    const payload: MyJwtPayload = {
      id: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
