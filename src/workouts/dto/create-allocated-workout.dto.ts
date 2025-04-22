import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested, IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AllocatedExercise } from '@prisma/client';

export class CreateAllocatedWorkoutDto {
  @IsOptional()
  @IsString()
  workoutId?: string;

  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  allocatedExercises?: AllocatedExercise[];

  id?: any;
}
