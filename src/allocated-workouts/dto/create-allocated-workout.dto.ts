import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateAllocatedExerciseDto {
  @IsString()
  @IsOptional()
  exerciseId?: string;

  @IsOptional()
  exerciseData?: any;

  @IsNotEmpty()
  sets: Prisma.JsonValue;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateAllocatedWorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  workoutId?: string;

  @IsString()
  @IsOptional()
  programId?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @IsOptional()
  @Type(() => CreateAllocatedExerciseDto)
  allocatedExercises?: CreateAllocatedExerciseDto[];
}
