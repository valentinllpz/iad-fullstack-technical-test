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
      photoUrl:
        'https://medias.maisonsetappartements.fr/pict/f400x267/4/0/0/8/ext_0_4008430.jpg?t=1757543882',
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
      photoUrl:
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/676336793.jpg?k=23fd823abffebc76dc033123c609107dd699b9b9af865a23485488260bc97c6f&o=&hp=1',
      landlordIds: [landlordJulien.id],
    });

    await unitsService.create({
      name: 'Loft Belleville',
      surface: 64,
      furnished: true,
      rentAmount: 1720,
      photoUrl:
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      landlordIds: [landlordJulien.id, landlordSophie.id],
    });

    await unitsService.create({
      name: 'Pied-à-terre Montmartre',
      surface: 44,
      furnished: true,
      rentAmount: 1480,
      photoUrl:
        'https://media.vrbo.com/lodging/90000000/89190000/89184400/89184354/12a30d45.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
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
