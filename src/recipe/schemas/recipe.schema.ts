import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
	timestamps: true
})
export class Recipe {
	@Prop()
	name: string;

	@Prop()
	ingredients: string;

	@Prop()
	preparationMethod: string;

	@Prop()
	imageUrl: string;

	@Prop()
	idAuthor: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
