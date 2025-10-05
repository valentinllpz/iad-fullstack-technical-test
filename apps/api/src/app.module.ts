import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Landlord } from './modules/landlords/landlord.entity';
import { LandlordsModule } from './modules/landlords/landlords.module';
import { Unit } from './modules/units/unit.entity';
import { UnitsModule } from './modules/units/units.module';

const envFilePath = process.env.NODE_ENV
  ? [`.env.${process.env.NODE_ENV}`, '.env.local', '.env']
  : ['.env.local', '.env'];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || 'data/db.sqlite',
      entities: [Unit, Landlord],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    UnitsModule,
    LandlordsModule,
  ],
})
export class AppModule {}
