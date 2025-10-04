import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { AppModule } from '../src/app.module';

describe('Units & Landlords relationship (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let dbPath: string;

  beforeAll(async () => {
    dbPath = join(
      tmpdir(),
      `use-case-units-landlords-${Date.now()}-${Math.random()}.sqlite`,
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

  it('creates landlords and units, lists them with relations, and deletes unit', async () => {
    const createLandlordResponse = await request(app.getHttpServer())
      .post('/landlords')
      .send({ firstName: 'Camille', lastName: 'Dupont' })
      .expect(201);

    const landlordId: string = createLandlordResponse.body.id;

    expect(landlordId).toBeDefined();

    const createUnitResponse = await request(app.getHttpServer())
      .post('/units')
      .send({
        name: 'Studio Le Marais',
        surface: 28,
        furnished: true,
        rentAmount: 1150,
        landlordIds: [landlordId],
      })
      .expect(201);

    const unitId: string = createUnitResponse.body.id;

    expect(createUnitResponse.body.landlords).toHaveLength(1);
    expect(createUnitResponse.body.landlords[0].id).toBe(landlordId);

    const listUnitsResponse = await request(app.getHttpServer())
      .get('/units')
      .expect(200);

    expect(listUnitsResponse.body).toHaveLength(1);
    expect(listUnitsResponse.body[0].landlords).toHaveLength(1);

    await request(app.getHttpServer()).get('/landlords').expect(200);

    await request(app.getHttpServer()).delete(`/units/${unitId}`).expect(200);

    const emptyUnitsResponse = await request(app.getHttpServer())
      .get('/units')
      .expect(200);

    expect(emptyUnitsResponse.body).toHaveLength(0);
  });

  it('returns 404 when deleting an unknown unit', async () => {
    await request(app.getHttpServer())
      .delete('/units/non-existent-id')
      .expect(404);
  });
});
