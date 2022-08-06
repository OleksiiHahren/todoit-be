import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@root/modules/common/auth/services/auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
 /* constructor(private authService: AuthService) {
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google sign-in',
    description: 'Google sign-in link, it wont be work from Swagger',
  })
  async googleSignIn(@Req() request) {
  }

  @Get('/google-redirect')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google sign-in',
    description: 'Google sign-in redirect link, it wont be work from Swagger',
  })
  async googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleAuth(req, res);
  }*/
}
