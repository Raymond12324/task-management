import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dtos';
import { InjectEntityManager } from '@nestjs/typeorm';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authService.signIn(authCredentialsDto);
    }
}