import { Container } from '@decorators/di';
import * as moxios from 'moxios';
import { giphyBadRequestResponse, giphyOkResponse } from 'src/mocks';

import { GiphyService } from './giphy.service';

jest.mock('src/adapters/axios.adapter');

const testStr = 'Teste';

describe('GiphyService (unit)', () => {
  let giphyService: GiphyService | null;

  beforeEach(() => {
    giphyService = Container.get<GiphyService>(GiphyService);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should be return a valid a gif from recipe', async () => {
    moxios.stubRequest(/gifs\/search\?q=/, giphyOkResponse);

    const recipes = await giphyService.getGifFromTitle(testStr);

    expect(recipes).toEqual(
      giphyOkResponse.response.data[0].images.original.url,
    );
  });

  it('should be trigger exception if status code is not 200', async () => {
    moxios.stubRequest(/gifs\/search\?q=/, giphyBadRequestResponse);

    await expect(giphyService.getGifFromTitle(testStr)).rejects.toThrow(
      'Não foi possível se comunicar com a API do Giphy',
    );
  });
});
