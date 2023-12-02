// create-recipe.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecipeDto {
	@IsNotEmpty({ message: 'O campo name não pode estar vazio.' })
	@IsString({ message: 'O campo name está esperando uma string.' })
	readonly name: string;

	@IsNotEmpty({ message: 'O campo ingredients não pode estar vazio.' })
	@IsString({ message: 'O campo ingredients está esperando uma string.' })
	readonly ingredients: string;

	@IsNotEmpty({ message: 'O campo preparationMethod não pode estar vazio.' })
	@IsString({ message: 'O campo preparationMethod está esperando uma string.' })
	readonly preparationMethod: string;
}
