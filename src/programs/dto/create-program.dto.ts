// create-program.dto.ts
import {
  IsString,
  IsOptional,
  IsInt,
  ValidateNested,
  IsArray, IsNumber,
} from 'class-validator';
// import { CreateAllocatedWorkoutDto } from '../../workouts/dto/create-allocated-workout.dto';
import { Type } from 'class-transformer';
import {Prisma} from "@prisma/client";

export class CreateAllocatedExerciseDto {
  @IsOptional()
  @IsString()
  exerciseId?: string | null;

  @IsOptional()
  sets?: Prisma.InputJsonValue | null; // ✅ FIXED JSON TYPE

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateAllocatedWorkoutDto {
  @IsOptional()
  @IsString()
  workoutId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAllocatedExerciseDto)
  allocatedExercises?: CreateAllocatedExerciseDto[];
}

export class CreateProgramDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  durationDays?: number;

  @IsOptional()
  @IsNumber()
  rotationDays?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAllocatedWorkoutDto)
  allocatedWorkouts?: CreateAllocatedWorkoutDto[];
}
