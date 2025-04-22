import { ApiProperty } from '@nestjs/swagger';
import {Exercise, WorkoutExercise} from '@prisma/client';
import {IsOptional} from "class-validator";
import {JsonValue} from "@prisma/client/runtime/client";


/**
 * The minimal shape for the Exercise in the base table.
 * If you want to include muscle groups or equipment, extend as needed.
 */
export class BaseExerciseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  // ... optionally more fields (muscles, equipment, etc.)
}

/**
 * The response shape for the base WorkoutExercise row.
 */
export class WorkoutExerciseResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  sets?: JsonValue[];

  @ApiProperty({ required: false })
  order?: number;

  @IsOptional()
  exercise?: Exercise;

  @IsOptional()
  exerciseData?: Exercise;
}

/**
 * The response shape for the base workout.
 */
export class WorkoutResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  description?: string | null;

  workoutExercises?: WorkoutExercise[] | null;
}
