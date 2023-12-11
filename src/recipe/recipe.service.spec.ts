import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
	let service: RecipeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RecipeService,
				{
					provide: getModelToken('Recipe'),
					useValue: {}
				}
			]
		}).compile();

		service = module.get<RecipeService>(RecipeService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
