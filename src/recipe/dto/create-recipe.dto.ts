import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
	@IsNotEmpty({ message: 'O nome da receita não pode estar vazio.' })
	@IsString({ message: 'O nome está esperando uma string.' })
	readonly name: string;

	@IsNotEmpty({ message: 'Os ingredientes não podem estar vazios.' })
	@IsString({ message: 'Os ingredientes estão esperando uma string.' })
	readonly ingredients: string;

	@IsNotEmpty({ message: 'O método de preparo não pode estar vazio.' })
	@IsString({ message: 'O método de preparo está esperando uma string.' })
	readonly preparationMethod: string;

	@IsNotEmpty({ message: 'A URL da imagem não pode estar vazia.' })
	@IsString({ message: 'A URL da imagem está esperando uma string.' })
	readonly imageUrl: string;

	@IsNotEmpty({ message: 'O ID do autor não pode estar vazio.' })
	@IsNumber({}, { message: 'O ID do autor está esperando um number.' })
	readonly idAuthor: number;
}
