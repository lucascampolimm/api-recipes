import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string;

	@IsNotEmpty()
	@IsEmail({}, { message: 'Digite um e-mail válido.' })
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	readonly password: string;

	@IsOptional()
	@IsString()
	readonly role: string;
}
