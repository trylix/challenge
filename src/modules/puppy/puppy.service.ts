import { Injectable } from '@decorators/di';
import { plainToClass } from 'class-transformer';
import { AxiosAdapter } from 'src/adapters/axios.adapter';
import { HttpException } from 'src/exceptions';
import { GiphyService } from 'src/modules/giphy/giphy.service';
import { RecipeDto } from 'src/modules/recipe/dto/recipe.dto';

@Injectable()
export class PuppyService extends AxiosAdapter {
  constructor(private giphyService: GiphyService) {
    super(process.env.RECIPE_PUPPY_API_URL);
  }

  async getRecipesFromIngredients(ingredients: string) {
    const { status, data } = await this.httpGet(`/?i=${ingredients}`);

    if (status !== 200) {
      throw new HttpException(
        'Não foi possível se comunicar com a API do Recipe Puppy',
        status,
      );
    }

    if (!data.results || data.results.length <= 0) {
      throw new HttpException(
        'Não encontramos nenhuma receita com esses ingredientes',
        404,
      );
    }

    const recipes = await Promise.all(
      data.results.map(async (recipe: any) => {
        const recipeDto = plainToClass(RecipeDto, recipe);

        const recipeGif = await this.giphyService.getGifFromTitle(
          recipeDto.title,
        );

        recipeDto.gif = recipeGif;

        return recipeDto;
      }),
    );

    return recipes;
  }
}
