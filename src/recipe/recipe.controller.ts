// recipe.controller.ts
import {
	Controller,
	Get,
	Param,
	Res,
	Post,
	UseGuards,
	Request,
	Body,
	Put,
	Delete,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './schemas/recipe.schema';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';

@Controller('recipes')
export class RecipeController {
	constructor(private recipeService: RecipeService) {}

	@Get()
	async getAllRecipes(): Promise<Recipe[]> {
		return this.recipeService.findAll();
	}
	@Get(':id/image')
	async serveImage(@Param('id') id: string, @Res() res: Response) {
		res.sendFile(id, { root: path.join(process.cwd(), 'imagens') });
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
	async updateRecipe(
		@Request() req,
		@Param('id') id: string,
		@Body() recipe: UpdateRecipeDto
	): Promise<Recipe> {
		const userId = req.user.id; // Ajuste aqui

		return this.recipeService.updateById(userId, id, recipe);
	}

	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	async deleteRecipe(@Request() req, @Param('id') id: string): Promise<Recipe> {
		const userId = req.user.id; // Ajuste aqui
		return this.recipeService.deleteById(userId, id);
	}
	@Post(':id/image')
	@UseGuards(AuthGuard('jwt'))
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: './imagens',
				filename: (req, file, callback) => {
					const recipeId = req.params.id;
					callback(null, `${recipeId}.jpeg`);
				}
			})
		})
	)
	async addImageToRecipe(
		@Request() req,
		@Param('id') id: string,
		@UploadedFile() image
	): Promise<Recipe> {
		const userId = req.user.id; // Use 'id' em vez de 'userId'
		return this.recipeService.addImageToRecipe(userId, id, image);
	}
}
