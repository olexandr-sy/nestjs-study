import { BadRequestException, Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import User from 'models/user.model';
import { ResetPasswordService } from 'src/reset-password/reset-password.service';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtResponseDto } from './dto/jwt.response.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request): Promise<JwtResponseDto> {
    return await this.authService.login(request.user);
  }

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<object> {
    const result = await this.authService.register(body);
    if (!result) {
      throw new BadRequestException('Email already registered in system');
    }
    return {};
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() request): Promise<User> {
    return request.user;
  }

  @Post('forgot-password/email')
  async forgotPassword(@Body() { email }: ForgotPasswordDto): Promise<object> {
    await this.resetPasswordService.sendResetPasswordCode(email);
    return {};
  }

  @Post('forgot-password/reset')
  async resetPassword(@Body() { code, password }: ResetPasswordDto): Promise<object> {
    const result = await this.resetPasswordService.resetPassword(code, password);
    if (!result) {
      throw new BadRequestException('Code wrong or expired!');
    }
    return {};
  }
}
