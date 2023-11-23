import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Recipe } from './schemas/recipe.schema';

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
		const recipe = await this.recipeModel.findById(id);

		if (!recipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		return recipe;
	}

	async updateById(id: string, recipe: Recipe): Promise<Recipe> {
		return await this.recipeModel.findByIdAndUpdate(id, recipe, {
			new: true,
			runValidators: true
		});
	}

	async deleteById(id: string): Promise<Recipe> {
		return await this.recipeModel.findByIdAndDelete(id);
	}
}
