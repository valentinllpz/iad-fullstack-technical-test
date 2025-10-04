import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { LandlordsService } from '../modules/landlords/landlords.service';
import { UnitsService } from '../modules/units/units.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const dataSource = app.get<DataSource>(getDataSourceToken());
    await dataSource.synchronize(true);

    const landlordsService = app.get(LandlordsService);
    const unitsService = app.get(UnitsService);

    const landlordCamille = await landlordsService.create({
      firstName: 'Camille',
      lastName: 'Dupont',
    });

    const landlordJulien = await landlordsService.create({
      firstName: 'Julien',
      lastName: 'Martin',
    });

    const landlordSophie = await landlordsService.create({
      firstName: 'Sophie',
      lastName: 'Bernard',
    });

    await unitsService.create({
      name: 'Haussmannien - 7e',
      surface: 92,
      furnished: true,
      rentAmount: 2850,
      photoUrl: 'https://example.com/haussmann-7e.jpg',
      landlordIds: [landlordCamille.id],
    });

    await unitsService.create({
      name: 'Studio Le Marais',
      surface: 28,
      furnished: true,
      rentAmount: 1150,
      landlordIds: [landlordCamille.id, landlordJulien.id],
    });

    await unitsService.create({
      name: 'Duplex Canal Saint-Martin',
      surface: 76,
      furnished: false,
      rentAmount: 1980,
      photoUrl: 'https://example.com/canal-saint-martin.jpg',
      landlordIds: [landlordJulien.id],
    });

    await unitsService.create({
      name: 'Loft Belleville',
      surface: 64,
      furnished: true,
      rentAmount: 1720,
      photoUrl: 'https://example.com/loft-belleville.jpg',
      landlordIds: [landlordJulien.id, landlordSophie.id],
    });

    await unitsService.create({
      name: 'Pied-a-terre Montmartre',
      surface: 44,
      furnished: true,
      rentAmount: 1480,
      landlordIds: [landlordSophie.id],
    });

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

seed();
