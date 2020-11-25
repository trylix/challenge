import AppModule from 'src/app.module';
import * as request from 'supertest';

const expectedResponse = {
  keywords: ['teste', 'teste', 'teste'],
};

describe('RecipeController (e2e)', () => {
  it('/recipes (GET): with valid ingredients', () => {
    return request(AppModule)
      .get('/recipes?i=teste,teste,teste')
      .expect(200)
      .expect(expectedResponse);
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
