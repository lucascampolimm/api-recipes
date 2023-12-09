import { IsNotEmpty, IsString } from 'class-validator';

export class AddImageDto {
	@IsNotEmpty({ message: 'O campo image não pode estar vazio.' })
	@IsString({ message: 'O campo image está esperando uma string.' })
	readonly image: string;
}
