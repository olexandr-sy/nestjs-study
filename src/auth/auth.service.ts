import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from 'models/user.model';
import { UserService } from 'src/user/user.service';
import { JwtResponseDto } from './dto/jwt.response.dto';
import { JwtPayloadDto } from './dto/jwt.payload.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.find({ email });
    if (!user || !(await this.userService.comparePasswords(pass, user.password))) {
      return null;
    }
    return user;
  }

  async login(user: User): Promise<JwtResponseDto | null> {
    return {
      accessToken: this.signJwt({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  signJwt(payload: JwtPayloadDto): string {
    return this.jwtService.sign(payload);
  }

  async register(data: RegisterDto): Promise<User | null> {
    const existedUser = await this.userService.find({ email: data.email });
    if (existedUser) {
      return null;
    }
    return this.userService.create(data);
  }
}
