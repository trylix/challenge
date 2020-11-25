import { Injectable } from '@decorators/di';
import { AxiosAdapter } from 'src/adapters/axios.adapter';
import { HttpException } from 'src/exceptions';

@Injectable()
export class PuppyService extends AxiosAdapter {
  constructor() {
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

    return data.results;
  }
}
