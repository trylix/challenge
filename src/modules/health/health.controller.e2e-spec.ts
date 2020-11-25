import AppModule from 'src/app.module';
import * as request from 'supertest';

describe('HealthController (e2e)', () => {
  it('/health (GET)', () => {
    return request(AppModule).get('/health').expect(200).expect({
      status: 'online',
    });
  });
});
