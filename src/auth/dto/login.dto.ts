import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
	@IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
	@IsEmail({}, { message: 'O campo email está esperando um email.' })
	readonly email: string;

	@IsNotEmpty({ message: 'O campo password não pode estar vazio.' })
	@IsString({ message: 'O campo password está esperando uma string.' })
	@MinLength(8, { message: 'O campo password deve ter no mínimo 8 caracteres.' })
	readonly password: string;
}
