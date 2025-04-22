import { IsString, IsOptional } from 'class-validator';

export class UpdateGymDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
