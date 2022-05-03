import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import User from 'models/user.model';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { JwtPayloadDto } from '../dto/jwt.payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwtSecret'),
    });
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    const user = this.userService.find({ id: payload.sub });
    if (!user) {
      throw new BadRequestException('Wrong payload');
    }
    return user;
  }
}
