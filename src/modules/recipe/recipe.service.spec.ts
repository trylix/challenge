import { Container } from '@decorators/di';

import { RecipeService } from './recipe.service';

const testStr = 'teste,teste,teste';

const expectedResponse = {
  keywords: ['teste', 'teste', 'teste'],
};

describe('RecipeService (unit)', () => {
  let recipeService: RecipeService | null;
  beforeEach(() => {
    recipeService = Container.get<RecipeService>(RecipeService);
  });

  it('should be return a valid ingredients array', async () => {
    const recipes = await recipeService.makeRecipeList(testStr);

    expect(recipes).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should be trigger a exception be ingredients less than 1', async () => {
    await expect(recipeService.makeRecipeList('')).rejects.toThrow(
      'Você precisa definir pelos menos 1 ingredientes',
    );
  });

  it('should be trigger a exception be ingredients more than 3', async () => {
    await expect(
      recipeService.makeRecipeList(testStr.concat(',teste')),
    ).rejects.toThrow('Você só pode escolher no máximo 3 ingredientes');
  });
});
