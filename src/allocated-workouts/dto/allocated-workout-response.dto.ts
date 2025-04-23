import { AllocatedExercise, AllocatedWorkout, Exercise, Workout } from '@prisma/client';

export class AllocatedExerciseResponseDto implements AllocatedExercise {
  id: string;
  allocatedWorkoutId: string;
  exerciseId: string | null;
  exerciseData: any | null;
  sets: any;
  order: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  exercise?: Exercise | null;
}

export class AllocatedWorkoutResponseDto implements AllocatedWorkout {
  id: string;
  name: string;
  workoutId: string | null;
  order: number | null;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
  programId: string | null;
  workout?: Workout | null;
  allocatedExercises?: AllocatedExerciseResponseDto[];
}
