import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
	imports: [
		MulterModule.register({
			storage: diskStorage({
				destination: path.resolve(__dirname, '..', 'src', 'imagens'),
				filename: (req, file, callback) => {
					const recipeId = req.params.id;
					callback(null, `${recipeId}.jpeg`);
				}
			})
		})
	]
})
export class YourModule {}
