import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import { Landlord } from './landlord.entity';
import { LandlordsService } from './landlords.service';

@Controller('landlords')
export class LandlordsController {
  constructor(private readonly landlordsService: LandlordsService) {}

  @Get()
  findAll(): Promise<Landlord[]> {
    return this.landlordsService.findAll();
  }

  @Post()
  create(@Body() createLandlordDto: CreateLandlordDto): Promise<Landlord> {
    return this.landlordsService.create(createLandlordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.landlordsService.remove(id);
  }
}
