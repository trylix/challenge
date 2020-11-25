import { Injectable } from '@decorators/di';
import { AxiosAdapter } from 'src/adapters/axios.adapter';
import { HttpException } from 'src/exceptions';

@Injectable()
export class GiphyService extends AxiosAdapter {
  private readonly apiKey: string;

  constructor() {
    super(process.env.GIPHY_API_URL);

    this.apiKey = process.env.GIPHY_API_KEY;
  }

  async getGifFromTitle(title: string) {
    const { status, data } = await this.httpGet(
      `/gifs/search?q=${title}&limit=1&api_key=${this.apiKey}`,
    );

    if (status !== 200) {
      throw new HttpException(
        'Não foi possível se comunicar com a API do Giphy',
        status,
      );
    }

    const { data: allGifsResult } = data;

    const [gif] = allGifsResult;

    return gif.images.original.url;
  }
}
