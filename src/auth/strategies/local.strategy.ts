import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import User from 'models/user.model';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { LOGIN_USERNAME_FIELD } from '../auth.constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: LOGIN_USERNAME_FIELD });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
