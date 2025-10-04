import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { AppModule } from '../src/app.module';

describe('Units API (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let dbPath: string;

  beforeAll(async () => {
    dbPath = join(
      tmpdir(),
      `use-case-units-${Date.now()}-${Math.random()}.sqlite`,
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

  it('creates and lists a unit linked to at least one landlord', async () => {
    const landlordResponse = await request(app.getHttpServer())
      .post('/landlords')
      .send({ firstName: 'Julien', lastName: 'Martin' })
      .expect(201);

    const landlordId = landlordResponse.body.id;

    const createUnitResponse = await request(app.getHttpServer())
      .post('/units')
      .send({
        name: 'Garret Latin Quarter',
        surface: 22,
        furnished: false,
        rentAmount: 920,
        landlordIds: [landlordId],
      })
      .expect(201);

    expect(createUnitResponse.body.landlords).toHaveLength(1);
    expect(createUnitResponse.body.landlords[0].id).toBe(landlordId);

    const listResponse = await request(app.getHttpServer())
      .get('/units')
      .expect(200);

    expect(listResponse.body).toHaveLength(1);
    expect(listResponse.body[0].landlords).toHaveLength(1);
    expect(listResponse.body[0].landlords[0].id).toBe(landlordId);
  });

  it('rejects unit creation when landlordIds is missing', async () => {
    await request(app.getHttpServer())
      .post('/units')
      .send({
        name: 'Invalid Unit',
        surface: 30,
        furnished: false,
        rentAmount: 800,
      })
      .expect(400);
  });
});
