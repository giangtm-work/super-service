import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from '@super-service/super-decorators';
import { JwtRefreshGuard, LocalAuthGuard } from '@super-service/super-guards';
import { AuthService } from './auth.service';

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Request() req: any) {
    return this.authService.refresh(req.user.refreshToken);
  }

  @Post('logout')
  async logout(@Request() req: any, @Body('refreshToken') refreshToken: string) {
    await this.authService.logout(req.user.id, refreshToken);
    return { message: 'Successfully logged out' };
  }

  @Post('logout-all')
  async logoutAll(@Request() req: any) {
    await this.authService.logoutAll(req.user.id);
    return { message: 'Successfully logged out from all devices' };
  }
}
