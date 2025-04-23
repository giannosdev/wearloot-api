import { PartialType } from '@nestjs/mapped-types';
import { CreateAllocatedWorkoutDto } from './create-allocated-workout.dto';

export class UpdateAllocatedWorkoutDto extends PartialType(CreateAllocatedWorkoutDto) {}
