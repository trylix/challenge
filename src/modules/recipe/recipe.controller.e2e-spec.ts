import * as moxios from 'moxios';
import AppModule from 'src/app.module';
import { giphyOkResponse, puppyOkResponse } from 'src/mocks';
import * as request from 'supertest';

jest.mock('src/adapters/axios.adapter');

const expectedResponse = {
  keywords: ['teste', 'teste', 'teste'],
};

describe('RecipeController (e2e)', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('/recipes (GET): with valid ingredients', async () => {
    moxios.stubRequest(/\?i=/, puppyOkResponse);

    moxios.stubRequest(/gifs\/search\?q=/, giphyOkResponse);

    const response = await request(AppModule).get(
      '/recipes?i=teste,teste,teste',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining(expectedResponse));
  });

  it('/recipes (GET): without ingredients', () => {
    return request(AppModule).get('/recipes?i=').expect(400);
  });

  it('/recipes (GET): with more than 3 ingredients', () => {
    return request(AppModule)
      .get('/recipes?i=teste,teste,teste,teste')
      .expect(400);
  });
});
