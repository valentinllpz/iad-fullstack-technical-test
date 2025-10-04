import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Landlord } from '../landlords/landlord.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './unit.entity';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitsRepository: Repository<Unit>,
    @InjectRepository(Landlord)
    private readonly landlordsRepository: Repository<Landlord>,
  ) {}

  async findAll(): Promise<Unit[]> {
    return this.unitsRepository.find({ relations: ['landlords'] });
  }

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    if (!createUnitDto.landlordIds || createUnitDto.landlordIds.length === 0) {
      throw new BadRequestException(
        'A unit must be linked to at least one landlord.',
      );
    }

    const landlords = await this.landlordsRepository.find({
      where: { id: In(createUnitDto.landlordIds) },
    });

    if (landlords.length !== createUnitDto.landlordIds.length) {
      throw new BadRequestException('One or more landlord ids are invalid.');
    }

    const unit = this.unitsRepository.create({
      name: createUnitDto.name,
      surface: createUnitDto.surface,
      furnished: createUnitDto.furnished,
      rentAmount: createUnitDto.rentAmount.toFixed(2),
      photoUrl: createUnitDto.photoUrl,
      landlords,
    });

    return this.unitsRepository.save(unit);
  }

  async remove(id: string): Promise<void> {
    const result = await this.unitsRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Unit ${id} not found`);
    }
  }
}
