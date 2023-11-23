import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRecipeDto {
	@IsOptional()
	@IsString({ message: 'O nome está esperando uma string.' })
	readonly name: string;

	@IsOptional()
	@IsString({ message: 'Os ingredientes estão esperando uma string.' })
	readonly ingredients: string;

	@IsOptional()
	@IsString({ message: 'O método de preparo está esperando uma string.' })
	readonly preparationMethod: string;

	@IsOptional()
	@IsString({ message: 'A URL da imagem está esperando uma string.' })
	readonly imageUrl: string;

	@IsOptional()
	@IsNumber({}, { message: 'O ID do autor está esperando um number.' })
	readonly idAuthor: number;
}
