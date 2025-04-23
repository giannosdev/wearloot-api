import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilterExerciseDto } from './dto/filter-exercises.dto';
import {Exercise, Prisma} from '@prisma/client';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  create(createExerciseDto: CreateExerciseDto) {
    // Prepare nested set details data if provided
    const nestedSets = createExerciseDto.sets?.map((set) => ({
      setNumber: set.setNumber,
      value: set.value,
      type: set.type,
      weight: set.weight,
      breakTime: set.breakTime,
    }));

    return this.prisma.exercise.create({
      data: {
        name: createExerciseDto.name,
        description: createExerciseDto.description,
        primaryMuscles: createExerciseDto.primaryMuscles?.length
          ? {
              connect: createExerciseDto.primaryMuscles.map((muscle) => ({
                id: muscle.id,
              })),
            }
          : undefined,
        secondaryMuscles: createExerciseDto.secondaryMuscles?.length
          ? {
              connect: createExerciseDto.secondaryMuscles.map((muscle) => ({
                id: muscle.id,
              })),
            }
          : undefined,
        equipment: createExerciseDto.equipment?.length
          ? {
              connect: createExerciseDto.equipment.map((equip) => ({
                id: equip.id,
              })),
            }
          : undefined,
        videoUrl: createExerciseDto.videoUrl,
        type: createExerciseDto.type,
        // Nested create for set details
        sets: nestedSets ? { create: nestedSets } : undefined,
        totalSetsDuration: createExerciseDto.totalSetsDuration,
      },
      include: {
        sets: true,
      },
    });
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    // Prepare nested set details data if provided
    const nestedSets = updateExerciseDto.sets?.map((set) => ({
      setNumber: set.setNumber,
      value: set.value,
      type: set.type,
      weight: set.weight,
      breakTime: set.breakTime,
    }));

    return this.prisma.exercise.update({
      where: { id },
      data: {
        name: updateExerciseDto.name,
        description: updateExerciseDto.description,
        primaryMuscles: updateExerciseDto.primaryMuscles?.length
          ? {
              set: updateExerciseDto.primaryMuscles.map((muscle) => ({
                id: muscle.id,
              })),
            }
          : undefined,
        secondaryMuscles: updateExerciseDto.secondaryMuscles?.length
          ? {
              set: updateExerciseDto.secondaryMuscles.map((muscle) => ({
                id: muscle.id,
              })),
            }
          : undefined,
        equipment: updateExerciseDto.equipment?.length
          ? {
              set: updateExerciseDto.equipment.map((equip) => ({
                id: equip.id,
              })),
            }
          : undefined,
        videoUrl: updateExerciseDto.videoUrl,
        type: updateExerciseDto.type,
        // Nested update for set details:
        // Delete all current set details, then create new ones
        sets: nestedSets
          ? {
              deleteMany: {}, // Remove existing sets
              create: nestedSets, // Create new sets
            }
          : undefined,
        totalSetsDuration: updateExerciseDto.totalSetsDuration,
      },
      include: {
        sets: true,
      },
    });
  }

  findAll(filterDto?: FilterExerciseDto) {
    // Start with an empty where clause.
    const where: Prisma.ExerciseWhereInput = {};

    // If a search string is provided, search in name or description (case-insensitive)
    if (filterDto?.search) {
      console.log('s', filterDto?.search);
      where.OR = [
        { name: { contains: filterDto.search, mode: 'insensitive' } },
        { description: { contains: filterDto.search, mode: 'insensitive' } },
      ];
    }

    // Filter by primary muscle groups (assuming relation field is primaryMuscles)
    if (filterDto?.primaryMuscles?.length) {
      where.primaryMuscles = {
        some: { id: { in: filterDto.primaryMuscles } },
      };
    }

    // Filter by secondary muscle groups (assuming relation field is secondaryMuscles)
    if (filterDto?.secondaryMuscles?.length) {
      where.secondaryMuscles = {
        some: { id: { in: filterDto.secondaryMuscles } },
      };
    }

    // Filter by equipment (assuming relation field is equipment)
    if (filterDto?.equipment?.length) {
      where.equipment = {
        some: { id: { in: filterDto.equipment } },
      };
    }

    // Filter by exercise type
    if (filterDto?.exerciseType) {
      where.type = {
        equals: filterDto.exerciseType,
      };
    }

    return this.prisma.exercise.findMany({
      where,
      include: {
        primaryMuscles: true,
        secondaryMuscles: true,
        equipment: true,
        sets: true,
      },
    });
  }

  async getExerciseForUpdate(id: string): Promise<UpdateExerciseDto | null> {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
    });
    
    if (!exercise) {
      return null;
    }
    
    // Convert Prisma model to DTO by converting null to undefined
    return {
      name: exercise.name,
      description: exercise.description || undefined,
      videoUrl: exercise.videoUrl || undefined,
      type: exercise.type || undefined,
      totalSetsDuration: exercise.totalSetsDuration || undefined,
      // Add other properties as needed
    };
  }

  findOne(id: string) {
    return this.prisma.exercise.findFirst({
      where: { id },
      include: {
        primaryMuscles: true, // Include related primary muscle data
        secondaryMuscles: true, // Include secondary muscles
        equipment: true, // Include equipment details
        sets: true,
      },
    });
  }

  /**
   * Handle exercise deletion while retaining details in workoutExercise and allocatedExercise.
   */
  async preserveExerciseDetails(exerciseId: string): Promise<void> {
    // Step 1: Get exercise details
    const exercise: UpdateExerciseDto | null = await this.getExerciseForUpdate(exerciseId);
    if (!exercise) {
      throw new NotFoundException(`Exercise ${exerciseId} not found`);
    }

    // Create a plain JSON-compatible object from the complex structure
    const exerciseDetails = {
      name: exercise.name,
      description: exercise.description,
      // Convert the complex objects to simple structures
      primaryMuscles: exercise.primaryMuscles ? exercise.primaryMuscles.map(m => ({ id: m.id })) : [],
      secondaryMuscles: exercise.secondaryMuscles ? exercise.secondaryMuscles.map(m => ({ id: m.id })) : [],
      equipment: exercise.equipment ? exercise.equipment.map(e => ({ id: e.id })) : [],
      videoUrl: exercise.videoUrl,
      type: exercise.type,
    };

    // Step 2: Update workoutExercises
    await this.prisma.workoutExercise.updateMany({
      where: { exerciseId },
      data: {
        exerciseData: exerciseDetails as any, // Type cast to any to bypass TypeScript checking
        exerciseId: null, // Unlink exerciseId
      },
    });

    // Step 3: Update allocatedExercises
    await this.prisma.allocatedExercise.updateMany({
      where: { exerciseId },
      data: {
        exerciseData: exerciseDetails as any, // Type cast to any to bypass TypeScript checking
        exerciseId: null, // Unlink exerciseId
      },
    });
  }

  async unlinkExerciseFromWorkoutExercises(exerciseId: string): Promise<void> {
    // Step 1: Get exercise details
    const exerciseData = await this.getExerciseForUpdate(exerciseId);
    if (!exerciseData) {
      throw new NotFoundException(`Exercise ${exerciseId} not found`);
    }

    // Create a plain JSON-compatible object from the complex structure
    const exerciseDetails = {
      name: exerciseData.name,
      description: exerciseData.description,
      // Convert the complex objects to simple structures
      primaryMuscles: exerciseData.primaryMuscles ? exerciseData.primaryMuscles.map(m => ({ id: m.id })) : [],
      secondaryMuscles: exerciseData.secondaryMuscles ? exerciseData.secondaryMuscles.map(m => ({ id: m.id })) : [],
      equipment: exerciseData.equipment ? exerciseData.equipment.map(e => ({ id: e.id })) : [],
      videoUrl: exerciseData.videoUrl,
      type: exerciseData.type,
    };

    // Step 2: Update workoutExercises
    await this.prisma.workoutExercise.updateMany({
      where: { exerciseId },
      data: {
        exerciseData: exerciseDetails as any, // Type cast to any to bypass TypeScript checking
        exerciseId: null, // Unlink exerciseId
      },
    });

    // Step 3: Update allocatedExercises
    await this.prisma.allocatedExercise.updateMany({
      where: { exerciseId },
      data: {
        exerciseData: exerciseDetails as any, // Type cast to any to bypass TypeScript checking
        exerciseId: null, // Unlink exerciseId
      },
    });
  }

  async unlinkExercise(exerciseId: string): Promise<void> {
    // Step 1: Get exercise details
    const exerciseData = await this.getExerciseForUpdate(exerciseId);
    
    if (!exerciseData) {
      throw new NotFoundException(`Exercise ${exerciseId} not found`);
    }

    // Create a plain JSON-compatible object from the complex structure
    const exerciseDetails = {
      name: exerciseData.name,
      description: exerciseData.description,
      // Convert the complex objects to simple structures
      primaryMuscles: exerciseData.primaryMuscles ? exerciseData.primaryMuscles.map(m => ({ id: m.id })) : [],
      secondaryMuscles: exerciseData.secondaryMuscles ? exerciseData.secondaryMuscles.map(m => ({ id: m.id })) : [],
      equipment: exerciseData.equipment ? exerciseData.equipment.map(e => ({ id: e.id })) : [],
      videoUrl: exerciseData.videoUrl,
      type: exerciseData.type,
    };

    // Step 2: Update workoutExercises
    await this.prisma.workoutExercise.updateMany({
      where: { exerciseId },
      data: {
        exerciseData: exerciseDetails as any, // Type cast to any to bypass TypeScript checking
        exerciseId: null, // Unlink exerciseId
      },
    });

    // Step 3: Update allocatedExercises
    await this.prisma.allocatedExercise.updateMany({
      where: { exerciseId },
      data: {
        exerciseData: exerciseDetails as any, // Type cast to any to bypass TypeScript checking
        exerciseId: null, // Unlink exerciseId
      },
    });
  }

  async remove(id: string) {
    // Step 1: Retrieve full exercise data before deleting
    const exercise = await this.getExerciseForUpdate(id);

    if (!exercise) {
      throw new Error('Exercise not found');
    }

    await this.preserveExerciseDetails(id); // Retain details before deleting

    // Step 3: Delete all related `SetDetails`
    await this.prisma.setDetails.deleteMany({
      where: { exerciseId: id },
    });

    // Step 4: Now safely delete the exercise template
    await this.prisma.exercise.delete({
      where: { id },
    });

    return {
      message:
        'Exercise deleted successfully, but full exercise data remains in workouts.',
    };
  }
}
