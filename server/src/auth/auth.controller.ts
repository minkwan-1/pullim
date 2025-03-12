import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response, Request } from 'express';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  //   constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
    return { email, password };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Google authentication will redirect to google/callback
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    console.log({ req, res });
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: { user: User }) {
    return req.user;
  }
}
