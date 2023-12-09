import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/users')
	signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
		return this.authService.signUp(signUpDto);
	}

	@Get('/login')
	async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
		try {
			const result = await this.authService.login(loginDto);
			return result;
		} catch (error) {
			throw new UnauthorizedException('E-mail ou senha incorretos.');
		}
	}
}
