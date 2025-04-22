import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutResponseDto } from './dto/workout-response.dto';
import { Exercise, Prisma, Workout, WorkoutExercise } from '@prisma/client';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a base workout, optionally with base exercises (WorkoutExercise).
   */
  async create(
    createWorkoutDto: CreateWorkoutDto,
  ): Promise<WorkoutResponseDto> {
    // 1) Create the base workout
    const workout = await this.prisma.workout.create({
      data: {
        name: createWorkoutDto.name,
        description: createWorkoutDto.description,
      },
    });

    // 2) If the DTO contains base exercises, store full exercise data
    if (createWorkoutDto.workoutExercises?.length) {
      const workoutExercises = await Promise.all(
        createWorkoutDto.workoutExercises.map(async (we, index) => {
          const exercise = await this.prisma.exercise.findUnique({
            where: { id: we.exerciseId },
          });

          return {
            workoutId: workout.id,
            exerciseId: we.exerciseId,
            sets: we.sets ? (we.sets as Prisma.InputJsonValue) : Prisma.JsonNull, // ✅ Fix JSON type
            order: we.order ?? index + 1,
            exerciseData: exercise ? exercise : undefined, // ✅ Store full exercise data
          };
        }),
      );

      await this.prisma.workoutExercise.createMany({ data: workoutExercises });
    }

    return this.findOne(workout.id);
  }

  /**
   * Update the base workout (name/description).
   * Optionally replace or modify the associated WorkoutExercises if desired.
   */
  async update(
    id: string,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<Workout> {
    // 1) Update the basic workout fields
    await this.prisma.workout.update({
      where: { id },
      data: {
        name: updateWorkoutDto.name,
        description: updateWorkoutDto.description,
      },
    });

    // 2) If we want to fully replace or modify the base exercises:
    if (updateWorkoutDto.workoutExercises) {
      // a) Delete existing "workoutExercises" for this workout
      await this.prisma.workoutExercise.deleteMany({
        where: { workoutId: id },
      });

      // b) Create new ones
      if (updateWorkoutDto.workoutExercises.length) {
        await this.prisma.workoutExercise.createMany({
          data: updateWorkoutDto.workoutExercises.map((we) => ({
            workoutId: id,
            exerciseId: we.exerciseId,
            sets: we.sets
              ? (we.sets as Prisma.InputJsonValue)
              : Prisma.JsonNull, // ✅ Fix JSON type
            order: we.order ?? 1,
            exerciseData: we.exerciseData ?? undefined, // Fix possible null issue
          })),
        });
      }
    }

    return this.findOne(id);
  }

  /**
   * Return a single base workout with its base exercises.
   */
  async findOne(id: string): Promise<Workout> {
    const workout = await this.prisma.workout.findUnique({
      where: { id },
      include: {
        workoutExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
    if (!workout) throw new NotFoundException(`Workout ${id} not found`);

    return workout;
  }

  /**
   * Return all base workouts with their base exercises.
   */
  async findAll(): Promise<WorkoutResponseDto[]> {
    const workouts = await this.prisma.workout.findMany({
      include: {
        workoutExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    return workouts;
  }

  /**
   * Delete the base workout and all its WorkoutExercises
   */
  async remove(id: string): Promise<void> {
    // 1) Delete any workoutExercises for this base workout
    await this.prisma.workoutExercise.deleteMany({
      where: { workoutId: id },
    });

    // 2) Then delete the base workout
    await this.prisma.workout.delete({
      where: { id },
    });
  }
}
