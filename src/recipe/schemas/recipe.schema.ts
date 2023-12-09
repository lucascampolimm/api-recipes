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

	@Prop({ type: Types.ObjectId, ref: 'User' })
	authorId: Types.ObjectId;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
