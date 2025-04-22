import {
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
  ValidateNested,
  IsInt,
  IsNumber,
  IsEnum,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

class ConnectDto {
  @IsString()
  id: string; // Used for referencing existing MuscleGroup or Equipment
}

enum SetType {
  REPS = 'REPS',
  DURATION = 'DURATION',
}

class CreateSetDto {
  @IsInt()
  setNumber: number;

  @IsOptional()
  @IsInt()
  value?: number; // Duration in seconds

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsEnum(SetType)
  type: SetType;

  @IsOptional()
  @IsInt()
  breakTime?: number; // Break time in seconds
}

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectDto)
  primaryMuscles?: ConnectDto[]; // Array of primary muscle group IDs

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectDto)
  secondaryMuscles?: ConnectDto[]; // Array of secondary muscle group IDs

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectDto)
  equipment?: ConnectDto[]; // Array of equipment IDs

  @IsOptional()
  @IsUrl()
  videoUrl?: string; // Optional video URL showing the exercise

  @IsOptional()
  @IsString()
  type?: string; // Exercise type (e.g., "Strength", "Cardio", etc.)

  @IsOptional()
  @IsInt()
  totalSetsDuration?: number; // Exercise type (e.g., "Strength", "Cardio", etc.)

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSetDto)
  sets?: CreateSetDto[]; // Array of set details
}
