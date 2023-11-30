import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<User>,
		private jwtService: JwtService
	) {}

	async validateUserById(id: any): Promise<User | null> {
		try {
			const user = await this.userModel.findById(id).exec();
			return user || null;
		} catch (error) {
			return null;
		}
	}

	async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
		const { name, email, password } = signUpDto;

		// Verifica se o email já existe
		const existingUser = await this.userModel.findOne({ email });
		if (existingUser) {
			throw new BadRequestException('Este email já está em uso.');
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await this.userModel.create({
			name,
			email,
			role: 'user', // Define o campo 'Role' como 'user'
			password: hashedPassword
		});

		const token = this.jwtService.sign({ id: user._id });

		return { token };
	}

	async login(loginDto: LoginDto): Promise<{ token: string }> {
		const { email, password } = loginDto;

		const user = await this.userModel.findOne({ email });

		if (!user) {
			throw new UnauthorizedException('E-mail ou senha incorretos');
		}

		const isPasswordMatched = await bcrypt.compare(password, user.password);

		if (!isPasswordMatched) {
			throw new UnauthorizedException('E-mail ou senha incorretos');
		}

		// Configurar o payload do token JWT
		const payload = {
			id: user._id,
			email: user.email,
			role: user.role
		};

		const token = this.jwtService.sign(payload);

		return { token };
	}
}
