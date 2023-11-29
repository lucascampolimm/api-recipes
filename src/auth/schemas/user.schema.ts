import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
	timestamps: true
})
export class User {
	@Prop({ unique: [true, 'E-mail já cadastrado.'] })
	email: string;

	@Prop()
	password: string;

	@Prop()
	name: string;

	@Prop({ default: 'user' }) // Defina 'user' como valor padrão
	role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
