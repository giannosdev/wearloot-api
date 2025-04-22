import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class AllocatedExerciseDto {
  @IsString()
  exerciseId: string | null;

  @IsOptional()
  sets: any; // Prisma.JsonValue

  exerciseData: Prisma.JsonValue;

  @IsNumber()
  order: number | null;

  @IsOptional()
  @IsString()
  notes: string | null;
}

export class AllocatedWorkoutDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  note?: string | null;

  @IsNumber()
  order?: number | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AllocatedExerciseDto)
  allocatedExercises: AllocatedExerciseDto[];
}

export class ProgramResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string | null; // ✅ Accept both undefined and null

  @IsNumber()
  durationDays: number | null; // ✅ Allow null

  @IsNumber()
  rotationDays: number | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AllocatedWorkoutDto)
  allocatedWorkouts: AllocatedWorkoutDto[];
}
