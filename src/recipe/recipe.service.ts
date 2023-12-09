import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
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
		const { name, ingredients, preparationMethod } = recipeDto;

		const recipeWithAuthor = {
			name,
			ingredients,
			preparationMethod,
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

	async updateById(userId: string, id: string, recipeDto: UpdateRecipeDto): Promise<Recipe> {
		const existingRecipe = await this.recipeModel.findById(id);

		if (!existingRecipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		if (existingRecipe?.authorId?.toString() !== userId) {
			throw new UnauthorizedException('Você não tem permissão para editar esta receita.');
		}

		const updatedRecipe = await this.recipeModel.findByIdAndUpdate(
			id,
			{ $set: recipeDto },
			{ new: true, runValidators: true }
		);

		if (!updatedRecipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		return updatedRecipe;
	}

	async deleteById(userId: string, id: string): Promise<Recipe> {
		const existingRecipe = await this.recipeModel.findById(id);

		if (!existingRecipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		if (existingRecipe.authorId.toString() !== userId) {
			throw new ForbiddenException('Você não tem permissão para excluir esta receita.');
		}

		const deletedRecipe = await this.recipeModel.findByIdAndDelete(id);

		if (!deletedRecipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		return deletedRecipe;
	}
	async addImageToRecipe(userId: string, id: string, image: any): Promise<Recipe> {
		const existingRecipe = await this.recipeModel.findById(id);

		if (!existingRecipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		if (!existingRecipe.authorId || existingRecipe.authorId.toString() !== userId) {
			throw new ForbiddenException('Você não tem permissão para editar esta receita.');
		}

		existingRecipe.image = `${image.filename}`;

		const updatedRecipe = await this.recipeModel.findByIdAndUpdate(id, existingRecipe, {
			new: true
		});

		return updatedRecipe;
	}
}
