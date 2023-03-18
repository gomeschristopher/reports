import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async createUser(@Body() body: SignupDto) {
        await this.authService.signup(body.email, body.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
