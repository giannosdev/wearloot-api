import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutDto } from './create-workout.dto';

/**
 * Update the base workout.
 * Because we're using `PartialType`,
 * all fields in CreateWorkoutDto become optional.
 */
export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {}
