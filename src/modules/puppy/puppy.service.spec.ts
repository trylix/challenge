import { Container } from '@decorators/di';
import * as moxios from 'moxios';
import { giphyOkResponse, puppyBadRequestResponse, puppyInvalidIngredientsResponse, puppyOkResponse } from 'src/mocks';

import { PuppyService } from './puppy.service';

jest.mock('src/adapters/axios.adapter');

const testStr = 'teste,teste,teste';

describe('PuppyService (unit)', () => {
  let puppyService: PuppyService | null;

  beforeEach(() => {
    puppyService = Container.get<PuppyService>(PuppyService);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should be return a valid recipe', async () => {
    moxios.stubRequest(/\?i=/, puppyOkResponse);

    moxios.stubRequest(/gifs\/search\?q=/, giphyOkResponse);

    const recipes = await puppyService.getRecipesFromIngredients(testStr);

    expect(recipes).toEqual(
      expect.objectContaining([
        {
          gif: 'teste',
          ingredients: [
            'black pepper',
            'cream cheese',
            'eggs',
            'garlic',
            'italian seasoning',
            'milk',
            'olive oil',
            'onions',
            'parmesan cheese',
            'red pepper',
            'salt',
            'tomato',
            'vermicelli',
            'zucchini',
          ],
          link:
            'http://find.myrecipes.com/recipes/recipefinder.dyn?action=displayRecipe&recipe_id=520763',
          title: 'Vegetable-Pasta Oven Omelet',
        },
      ]),
    );
  });

  it('should be trigger exception if status code not is 200', async () => {
    moxios.stubRequest(/\?i=/, puppyBadRequestResponse);

    await expect(
      puppyService.getRecipesFromIngredients(testStr),
    ).rejects.toThrow(
      'Não foi possível se comunicar com a API do Recipe Puppy',
    );
  });

  it('should be trigger exception if recipe with ingredients not found', async () => {
    moxios.stubRequest(/\?i=/, puppyInvalidIngredientsResponse);

    await expect(
      puppyService.getRecipesFromIngredients(testStr),
    ).rejects.toThrow('Não encontramos nenhuma receita com esses ingredientes');
  });
});
