// recipe.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
	timestamps: true
})
export class Recipe extends Document {
	@Prop()
	name: string;

	@Prop()
	ingredients: string;

	@Prop()
	preparationMethod: string;

	@Prop()
	image: string;

	@Prop({ type: Types.ObjectId, ref: 'User' }) // Adicione a referência ao esquema de usuário
	authorId: Types.ObjectId;

	// Se necessário, você pode adicionar outros campos do esquema aqui
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
