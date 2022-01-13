import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentails.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() authCredentailsdto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentailsdto);
  }
}
