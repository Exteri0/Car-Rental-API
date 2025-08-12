import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../constants';
import { MyJwtPayload } from '../types/jwt-payload.types';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret ? jwtConstants.secret : 'this is secret',
    });
  }

  validate(payload: MyJwtPayload) {
    return { userId: payload.id, email: payload.email };
  }
}
