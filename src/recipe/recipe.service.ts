// recipe.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schemas/recipe.schema';
import * as mongoose from 'mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
	constructor(
		@InjectModel(Recipe.name)
		private recipeModel: mongoose.Model<Recipe>
	) {}
	async createRecipe(userId: string, recipeDto: CreateRecipeDto): Promise<Recipe> {
		const { name, ingredients, preparationMethod, imageUrl } = recipeDto;

		const recipeWithAuthor = {
			name,
			ingredients,
			preparationMethod,
			imageUrl,
			authorId: userId
		};

		const createdRecipe = await this.recipeModel.create(recipeWithAuthor);

		return createdRecipe;
	}
	async findAll(): Promise<Recipe[]> {
		const recipes = await this.recipeModel.find();
		return recipes;
	}

	async findById(id: string): Promise<Recipe> {
		const isValidId = mongoose.isValidObjectId(id);

		if (!isValidId) {
			throw new BadRequestException('ID inválido.');
		}

		const recipe = await this.recipeModel.findById(id);

		if (!recipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		return recipe;
	}

	async updateById(id: string, recipeDto: UpdateRecipeDto): Promise<Recipe> {
		const updatedRecipe = await this.recipeModel.findByIdAndUpdate(
			id,
			{ $set: recipeDto }, // Use $set para atualizar apenas os campos fornecidos
			{ new: true, runValidators: true }
		);

		if (!updatedRecipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		return updatedRecipe;
	}

	async deleteById(id: string): Promise<Recipe> {
		const isValidId = mongoose.isValidObjectId(id);

		if (!isValidId) {
			throw new BadRequestException('ID inválido.');
		}

		const deletedRecipe = await this.recipeModel.findByIdAndDelete(id);

		if (!deletedRecipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		return deletedRecipe;
	}
}
