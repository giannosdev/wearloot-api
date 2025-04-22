import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Exercise } from '@prisma/client';
import {JsonValue} from "@prisma/client/runtime/client";

/**
 * Represents one base exercise in a workout ("WorkoutExercise").
 * This is NOT an allocated copy; it's the official part of the base workout.
 */
export class WorkoutExerciseDto {
  @IsOptional()
  @IsString()
  exerciseId: string; // ID of an existing Exercise

  @IsOptional()
  exercise?: Exercise; // Full exercise data (if you store it in the base)

  @IsOptional()
  exerciseData?: Exercise; // Full exercise data (if you store it in the base)

  @IsOptional()
  @IsArray()
  sets?: JsonValue; // If you store default sets in the base

  @IsOptional()
  @IsInt()
  order?: number; // The ordering in the base workout
}

/**
 * The DTO for creating a base workout.
 */
export class CreateWorkoutDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  /**
   * The base exercises that belong to this workout.
   * We rename from "allocatedExercises" to "workoutExercises" to avoid confusion.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseDto)
  workoutExercises?: WorkoutExerciseDto[];
}
