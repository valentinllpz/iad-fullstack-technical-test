import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Landlord } from '../landlords/landlord.entity';

@Entity({ name: 'units' })
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'integer' })
  surface!: number;

  @Column({ default: false })
  furnished!: boolean;

  @Column({ name: 'rent_amount', type: 'decimal', precision: 10, scale: 2 })
  rentAmount!: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToMany(() => Landlord, (landlord) => landlord.units, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'units_landlords',
    joinColumn: { name: 'unit_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'landlord_id', referencedColumnName: 'id' },
  })
  landlords!: Landlord[];
}
