// recipe.controller.ts
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
	Request
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './schemas/recipe.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
export class RecipeController {
	constructor(private recipeService: RecipeService) {}

	@Get()
	async getAllRecipes(): Promise<Recipe[]> {
		return this.recipeService.findAll();
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async createRecipe(@Request() req, @Body() recipe: CreateRecipeDto): Promise<Recipe> {
		const userId = req.user.id; // Obtenha o ID do usuário do token JWT
		return this.recipeService.createRecipe(userId, recipe);
	}

	@Get(':id')
	async getRecipe(@Param('id') id: string): Promise<Recipe> {
		return this.recipeService.findById(id);
	}

	@Put(':id')
	@UseGuards(AuthGuard('jwt'))
	async updateRecipe(@Param('id') id: string, @Body() recipe: UpdateRecipeDto): Promise<Recipe> {
		return this.recipeService.updateById(id, recipe);
	}

	@Delete(':id')
	async deleteRecipe(@Param('id') id: string): Promise<Recipe> {
		return this.recipeService.deleteById(id);
	}
}
