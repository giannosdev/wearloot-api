import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import {
  AllocatedExerciseDto,
  AllocatedWorkoutDto,
  ProgramResponseDto,
} from './dto/program-response.dto';
import {
  AllocatedExercise,
  AllocatedWorkout,
  Exercise,
  Prisma,
  Program,
} from '@prisma/client';
import { InputJsonValue, JsonValue } from '@prisma/client/runtime/client';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new Program in the given Gym.
   */
  async create(createProgramDto: CreateProgramDto) {
    return await this.prisma.program.create({
      data: {
        name: createProgramDto.name,
        description: createProgramDto.description,
        durationDays: createProgramDto.durationDays,
        rotationDays: createProgramDto.rotationDays,
        allocatedWorkouts: {
          create: (createProgramDto.allocatedWorkouts || []).map((aw) => ({
            workoutId: aw.workoutId ?? null,
            name: aw.name ?? '',
            note: aw.note ?? '',
            order: aw.order ?? 1,
            allocatedExercises: {
              create: (aw.allocatedExercises || []).map((ae) => ({
                exerciseId: ae.exerciseId ?? null, // ✅ No FK violation
                sets: ae.sets ?? Prisma.JsonNull,
                order: ae.order ?? 1,
                notes: ae.notes ?? '',
              })),
            },
          })),
        },
      },
      include: {
        allocatedWorkouts: {
          include: {
            allocatedExercises: {
              include: { exercise: true },
            },
          },
        },
      },
    });
  }



  /**
   * Return all Programs with their allocatedWorkouts.
   */
  async findAll(): Promise<ProgramResponseDto[]> {
    const programs = await this.prisma.program.findMany({
      include: {
        allocatedWorkouts: {
          include: {
            allocatedExercises: {
              include: { exercise: true },
            },
          },
        },
      },
    });
    return programs;
  }

  /**
   * Find a single Program by ID, including allocatedWorkouts -> allocatedExercises.
   */
  async findOne(id: string): Promise<Program> {
    const program = await this.prisma.program.findUnique({
      where: { id },
      include: {
        allocatedWorkouts: {
          include: {
            allocatedExercises: {
              include: { exercise: true },
            },
          },
        },
      },
    });

    console.log('pr2', program?.allocatedWorkouts.map((aw) => aw.allocatedExercises));

    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }

    return program;
  }

  /**
   * Update name/description/durationDays/rotationDays, etc.
   * If you also want to update allocatedWorkouts, you'd handle that here or in a separate method.
   */
  async update(id: string, updateProgramDto: UpdateProgramDto) {
    // Step 1: Find all allocatedWorkouts for this program
    const allocatedWorkouts = await this.prisma.allocatedWorkout.findMany({
      where: { programId: id },
      select: { id: true }, // Only fetch the ID of allocatedWorkouts
    });

    // Step 2: Delete allocatedExercises linked to those workouts
    const workoutIds = allocatedWorkouts.map((aw) => aw.id);
    if (workoutIds.length) {
      await this.prisma.allocatedExercise.deleteMany({
        where: { allocatedWorkoutId: { in: workoutIds } },
      });
    }

    // Step 3: Delete the allocatedWorkouts themselves
    await this.prisma.allocatedWorkout.deleteMany({
      where: { programId: id },
    });

    // Step 4: Create the new program data
    const updatedProgram = await this.prisma.program.update({
      where: { id },
      data: {
        name: updateProgramDto.name,
        description: updateProgramDto.description ?? null,
        allocatedWorkouts: {
          create: (updateProgramDto.allocatedWorkouts || []).map((aw) => ({
            workoutId: aw.workoutId ?? null,
            name: aw.name ?? '',
            note: aw.note ?? '',
            order: aw.order ?? 1,
            allocatedExercises: {
              create: (aw.allocatedExercises || []).map((ae) => ({
                exerciseId: ae.exerciseId ?? null,
                sets: ae.sets
                  ? (ae.sets as Prisma.InputJsonValue)
                  : Prisma.JsonNull,
                order: ae.order ?? 1,
                notes: ae.notes ?? '',
              })),
            },
          })),
        },
      },
      include: {
        allocatedWorkouts: {
          include: {
            allocatedExercises: {
              include: { exercise: true },
            },
          },
        },
      },
    });

    console.log('updatedProgram', updatedProgram);

    return updatedProgram;
  }

  /**
   * Removes a program and any allocatedWorkouts (and allocatedExercises) referencing it.
   */
  async remove(id: string): Promise<void> {
    // 1) Find all allocatedWorkouts referencing this Program
    const allocatedWorkouts = await this.prisma.allocatedWorkout.findMany({
      where: { programId: id },
      select: { id: true },
    });

    // 2) For each allocatedWorkout, remove its allocatedExercises
    for (const aw of allocatedWorkouts) {
      await this.prisma.allocatedExercise.deleteMany({
        where: { allocatedWorkoutId: aw.id },
      });
    }

    // 3) Delete the allocatedWorkouts themselves
    await this.prisma.allocatedWorkout.deleteMany({
      where: { programId: id },
    });

    // 4) Finally, delete the Program
    await this.prisma.program.delete({
      where: { id },
    });
  }

  /**
   * Example method if you want to update an existing allocatedWorkout within the program:
   * e.g., remove all allocatedExercises and re-create them, or partially update.
   */
}
