import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
// Adicione a configuração do Multer no módulo
@Module({
	imports: [
		MulterModule.register({
			storage: diskStorage({
				destination: path.resolve(__dirname, '..', 'src', 'imagens'),
				filename: (req, file, callback) => {
					const recipeId = req.params.id;
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					callback(null, `${recipeId}-${uniqueSuffix}.jpeg`);
				}
			})
		})
	]
	// ...
})
export class YourModule {}
