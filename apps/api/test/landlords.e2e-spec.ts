import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { AppModule } from '../src/app.module';

describe('Landlords API (e2e)', () => {
  let dbPath: string;
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    dbPath = join(
      tmpdir(),
      `use-case-landlords-${Date.now()}-${Math.random()}.sqlite`,
    );
    process.env.DB_PATH = dbPath;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get<DataSource>(getDataSourceToken());
  });

  beforeEach(async () => {
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await app.close();
    await fs.rm(dbPath, { force: true });
  });

  it('creates, lists, and deletes a landlord', async () => {
    const createLandlordResponse = await request(app.getHttpServer())
      .post('/landlords')
      .send({ firstName: 'Julien', lastName: 'Martin' })
      .expect(201);

    const landlordId = createLandlordResponse.body.id;

    const listResponse = await request(app.getHttpServer())
      .get('/landlords')
      .expect(200);

    expect(listResponse.body).toHaveLength(1);
    expect(listResponse.body[0].firstName).toBe('Julien');

    await request(app.getHttpServer())
      .delete(`/landlords/${landlordId}`)
      .expect(200);

    const emptyResponse = await request(app.getHttpServer())
      .get('/landlords')
      .expect(200);

    expect(emptyResponse.body).toHaveLength(0);
  });
});
