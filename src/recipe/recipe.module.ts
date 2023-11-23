import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeSchema } from './schemas/recipe.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }])],
	controllers: [RecipeController],
	providers: [RecipeService]
})
export class RecipeModule {}
