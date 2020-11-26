import { Injectable } from '@decorators/di';
import { HttpException } from 'src/exceptions';
import { PuppyService } from 'src/modules/puppy/puppy.service';
import { transformToArray } from 'src/shared/utils';

@Injectable()
export class RecipeService {
  constructor(private puppyService: PuppyService) {}

  async makeRecipeList(ingredients: string) {
    const keywords = transformToArray(ingredients);

    if (keywords.length <= 0 || (keywords.length === 1 && keywords[0] === '')) {
      throw new HttpException(
        'Você precisa definir pelos menos 1 ingredientes',
        400,
      );
    }

    if (keywords.length > 3) {
      throw new HttpException(
        'Você só pode escolher no máximo 3 ingredientes',
        400,
      );
    }

    const recipes = await this.puppyService.getRecipesFromIngredients(
      ingredients,
    );

    return {
      keywords,
      recipes,
    };
  }
}
