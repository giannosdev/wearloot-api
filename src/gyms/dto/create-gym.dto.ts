import { IsString, IsOptional } from 'class-validator';

export class CreateGymDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  address?: string;
}
