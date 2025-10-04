export class CreateUnitDto {
  name!: string;
  surface!: number;
  furnished!: boolean;
  rentAmount!: number;
  photoUrl?: string;
  landlordIds?: string[];
}
