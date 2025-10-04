import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './unit.entity';
import { UnitsService } from './units.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  findAll(): Promise<Unit[]> {
    return this.unitsService.findAll();
  }

  @Post()
  create(@Body() createUnitDto: CreateUnitDto): Promise<Unit> {
    return this.unitsService.create(createUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.unitsService.remove(id);
  }
}
