import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Unit } from '../src/modules/units/unit.entity';

describe('Units API (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
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

  it('lists units with the newest first', async () => {
    const landlordResponse = await request(app.getHttpServer())
      .post('/landlords')
      .send({ firstName: 'Camille', lastName: 'Dupont' })
      .expect(201);

    const landlordId = landlordResponse.body.id;

    const firstUnitResponse = await request(app.getHttpServer())
      .post('/units')
      .send({
        name: 'Ancien appartement',
        surface: 40,
        furnished: true,
        rentAmount: 1200,
        landlordIds: [landlordId],
      })
      .expect(201);

    const secondUnitResponse = await request(app.getHttpServer())
      .post('/units')
      .send({
        name: 'Nouveau duplex',
        surface: 85,
        furnished: false,
        rentAmount: 2500,
        landlordIds: [landlordId],
      })
      .expect(201);

    const unitRepository = dataSource.getRepository(Unit);
    await unitRepository.update(firstUnitResponse.body.id, {
      createdAt: new Date('2025-10-01T10:00:00.000Z'),
    });
    await unitRepository.update(secondUnitResponse.body.id, {
      createdAt: new Date('2025-10-01T11:00:00.000Z'),
    });

    const listResponse = await request(app.getHttpServer())
      .get('/units')
      .expect(200);

    expect(listResponse.body).toHaveLength(2);
    expect(listResponse.body[0].id).toBe(secondUnitResponse.body.id);
    expect(listResponse.body[1].id).toBe(firstUnitResponse.body.id);
  });
});
