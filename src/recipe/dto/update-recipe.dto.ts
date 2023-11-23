export class UpdateRecipeDto {
	readonly name: string;
	readonly ingredients: string;
	readonly preparationMethod: string;
	readonly imageUrl: string;
	readonly idAuthor: number;
}
