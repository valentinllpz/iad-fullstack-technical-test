import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import { Landlord } from './landlord.entity';

@Injectable()
export class LandlordsService {
  constructor(
    @InjectRepository(Landlord)
    private readonly landlordsRepository: Repository<Landlord>,
  ) {}

  async findAll(): Promise<Landlord[]> {
    return this.landlordsRepository.find({ relations: ['units'] });
  }

  async create(createLandlordDto: CreateLandlordDto): Promise<Landlord> {
    const landlord = this.landlordsRepository.create({
      firstName: createLandlordDto.firstName,
      lastName: createLandlordDto.lastName,
    });

    return this.landlordsRepository.save(landlord);
  }

  async remove(id: string): Promise<void> {
    const result = await this.landlordsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Landlord ${id} not found`);
    }
  }
}
