import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Landlord } from './modules/landlords/landlord.entity';
import { LandlordsModule } from './modules/landlords/landlords.module';
import { Unit } from './modules/units/unit.entity';
import { UnitsModule } from './modules/units/units.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH ?? 'data/db.sqlite',
      entities: [Unit, Landlord],
      synchronize: true, // TODO: disable in production
    }),
    UnitsModule,
    LandlordsModule,
  ],
})
export class AppModule {}
