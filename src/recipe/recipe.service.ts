// recipe.service.ts
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

	async updateById(userId: string, id: string, recipeDto: UpdateRecipeDto): Promise<Recipe> {
		// Verificar se a receita pertence ao usuário logado
		const existingRecipe = await this.recipeModel.findById(id);

		if (!existingRecipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		// Logs para depurar

		// Converter o authorId para string antes da comparação
		if (existingRecipe?.authorId?.toString() !== userId) {
			throw new UnauthorizedException('Você não tem permissão para editar esta receita.');
		}

		// Atualizar a receita
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

		// Adicionando logs para depuração

		// Verifique se o usuário tem permissão para excluir a receita
		if (existingRecipe.authorId.toString() !== userId) {
			throw new ForbiddenException('Você não tem permissão para excluir esta receita.');
		}

		const deletedRecipe = await this.recipeModel.findByIdAndDelete(id);

		if (!deletedRecipe) {
			throw new NotFoundException('Receita não encontrada.');
		}

		return deletedRecipe;
	}
}
