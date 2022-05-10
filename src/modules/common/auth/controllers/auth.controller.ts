import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@root/modules/common/auth/services/auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google sign-in',
    description: 'Google sign-in link, it wont be work from Swagger',
  })
  async googleSignIn(@Req() request) {}

  @Get('/google-redirect')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google sign-in',
    description: 'Google sign-in redirect link, it wont be work from Swagger',
  })
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleAuth(req);
  }

  @Post('/sign-in')
  @ApiOperation({
    summary: 'Sign-in by password',
    description: 'Sign in by default login and pass',
  })
  signIn(@Body() data) {
    return this.authService.signIn(data);
  }

  @Post('sign-up')
  @ApiOperation({
    summary: 'Registration new user',
    description: 'User registration follow email and password creation',
  })
  signUp(@Body() data) {
    return this.authService.signUp(data);
  }

}
