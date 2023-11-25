import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRecipeDto {
	@IsOptional()
	@IsString({ message: 'O campo name está esperando uma string.' })
	readonly name: string;

	@IsOptional()
	@IsString({ message: 'O campo ingredients está esperando uma string.' })
	readonly ingredients: string;

	@IsOptional()
	@IsString({ message: 'O campo preparationMethod está esperando uma string.' })
	readonly preparationMethod: string;

	@IsOptional()
	@IsString({ message: 'O campo imageUrl está esperando uma string.' })
	readonly imageUrl: string;

	@IsOptional()
	@IsNumber({}, { message: 'O campo idAuthor está esperando um number.' })
	readonly idAuthor: number;
}
