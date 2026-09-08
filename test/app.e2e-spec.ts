import 'dotenv/config'
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module.js';

describe('App graphql api e2e', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get profile', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            profiles {
              id
            }
          }
        `,
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.data).toHaveProperty('profiles');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
