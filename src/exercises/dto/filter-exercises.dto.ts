// dto/filter-exercises.dto.ts
import { Transform } from 'class-transformer';
import { IsOptional, IsArray, IsString } from 'class-validator';

export class FilterExerciseDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  primaryMuscles?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  secondaryMuscles?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  equipment?: string[];

  @IsOptional()
  @IsString()
  exerciseType?: string;
}
