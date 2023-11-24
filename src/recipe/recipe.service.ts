import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schemas/recipe.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class RecipeService {
	constructor(
		@InjectModel(Recipe.name)
		private recipeModel: mongoose.Model<Recipe>
	) {}

	async findAll(): Promise<Recipe[]> {
		const recipes = await this.recipeModel.find();
		return recipes;
	}

	async create(recipe: Recipe): Promise<Recipe> {
		const res = await this.recipeModel.create(recipe);
		return res;
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

	async updateById(id: string, recipe: Recipe): Promise<Recipe> {
		const isValidId = mongoose.isValidObjectId(id);

		if (!isValidId) {
			throw new BadRequestException('ID inválido.');
		}

		const updatedRecipe = await this.recipeModel.findByIdAndUpdate(id, recipe, {
			new: true,
			runValidators: true
		});

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
