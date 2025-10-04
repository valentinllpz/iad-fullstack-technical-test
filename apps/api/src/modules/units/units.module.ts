import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { Unit } from './unit.entity';
import { Landlord } from '../landlords/landlord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Landlord])],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}
