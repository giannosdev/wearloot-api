import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreateAllocatedWorkoutDto, 
  UpdateAllocatedWorkoutDto,
  AllocatedWorkoutResponseDto
} from './dto';
import { AllocatedExercise, AllocatedWorkout, Prisma } from '@prisma/client';

@Injectable()
export class AllocatedWorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new allocated workout with exercises
   * 
   * @param createAllocatedWorkoutDto - Data to create the allocated workout
   * @returns The created allocated workout with its exercises
   */
  async create(createAllocatedWorkoutDto: CreateAllocatedWorkoutDto): Promise<AllocatedWorkoutResponseDto> {
    return this.prisma.allocatedWorkout.create({
      data: {
        name: createAllocatedWorkoutDto.name,
        workoutId: createAllocatedWorkoutDto.workoutId ?? null,
        programId: createAllocatedWorkoutDto.programId ?? null,
        note: createAllocatedWorkoutDto.note ?? null,
        order: createAllocatedWorkoutDto.order ?? null,
        allocatedExercises: {
          create: (createAllocatedWorkoutDto.allocatedExercises || []).map(ae => ({
            exerciseId: ae.exerciseId ?? null,
            exerciseData: ae.exerciseData ?? null,
            sets: ae.sets ?? Prisma.JsonNull,
            order: ae.order ?? null,
            notes: ae.notes ?? null,
          })),
        },
      },
      include: {
        workout: true,
        allocatedExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  /**
   * Retrieve all allocated workouts
   * 
   * @param programId - Optional filter by program ID
   * @returns Array of allocated workouts with their exercises
   */
  async findAll(programId?: string): Promise<AllocatedWorkoutResponseDto[]> {
    const where = programId ? { programId } : {};
    
    return this.prisma.allocatedWorkout.findMany({
      where,
      include: {
        workout: true,
        allocatedExercises: {
          include: {
            exercise: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  /**
   * Find an allocated workout by ID
   * 
   * @param id - The ID of the allocated workout to find
   * @returns The found allocated workout with its exercises
   * @throws NotFoundException if the allocated workout is not found
   */
  async findOne(id: string): Promise<AllocatedWorkoutResponseDto> {
    const allocatedWorkout = await this.prisma.allocatedWorkout.findUnique({
      where: { id },
      include: {
        workout: true,
        allocatedExercises: {
          include: {
            exercise: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!allocatedWorkout) {
      throw new NotFoundException(`Allocated workout with ID ${id} not found`);
    }

    return allocatedWorkout;
  }

  /**
   * Update an allocated workout and its exercises
   * 
   * @param id - The ID of the allocated workout to update
   * @param updateAllocatedWorkoutDto - The data to update
   * @returns The updated allocated workout with its exercises
   * @throws NotFoundException if the allocated workout is not found
   */
  async update(id: string, updateAllocatedWorkoutDto: UpdateAllocatedWorkoutDto) {
    // If there are allocated exercises in the DTO, delete existing ones first
    if (updateAllocatedWorkoutDto.allocatedExercises) {
      await this.prisma.allocatedExercise.deleteMany({
        where: { allocatedWorkoutId: id },
      });
    }

    // Create a properly typed data object for Prisma update
    const updateData: any = {}; // Using 'any' temporarily to build a properly typed object

    // Only add fields that are defined in the DTO
    if (updateAllocatedWorkoutDto.name !== undefined) {
      updateData.name = updateAllocatedWorkoutDto.name;
    }
    
    if (updateAllocatedWorkoutDto.workoutId !== undefined) {
      updateData.workoutId = updateAllocatedWorkoutDto.workoutId;
    }
    
    if (updateAllocatedWorkoutDto.programId !== undefined) {
      updateData.programId = updateAllocatedWorkoutDto.programId;
    }
    
    if (updateAllocatedWorkoutDto.note !== undefined) {
      updateData.note = updateAllocatedWorkoutDto.note;
    }
    
    if (updateAllocatedWorkoutDto.order !== undefined) {
      updateData.order = updateAllocatedWorkoutDto.order;
    }
    
    // Add allocatedExercises if present
    if (updateAllocatedWorkoutDto.allocatedExercises) {
      updateData.allocatedExercises = {
        create: updateAllocatedWorkoutDto.allocatedExercises.map(ae => ({
          exerciseId: ae.exerciseId ?? null,
          exerciseData: ae.exerciseData ?? null,
          sets: ae.sets,
          order: ae.order ?? null,
          notes: ae.notes ?? null,
        })),
      };
    }

    // Perform the update with the properly structured data object
    return this.prisma.allocatedWorkout.update({
      where: { id },
      data: updateData,
      include: {
        workout: true,
        allocatedExercises: {
          include: {
            exercise: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  /**
   * Remove an allocated workout and its exercises
   * 
   * @param id - The ID of the allocated workout to remove
   * @returns Void
   */
  async remove(id: string): Promise<void> {
    // Delete all associated allocated exercises first
    await this.prisma.allocatedExercise.deleteMany({
      where: { allocatedWorkoutId: id },
    });

    // Then delete the allocated workout
    await this.prisma.allocatedWorkout.delete({
      where: { id },
    });
  }

  /**
   * Clone an allocated workout and its exercises
   * 
   * @param id - The ID of the allocated workout to clone
   * @param programId - Optional new program ID to assign
   * @returns The cloned allocated workout
   */
  async clone(id: string, programId?: string): Promise<AllocatedWorkoutResponseDto> {
    const allocatedWorkout = await this.findOne(id);
    
    const createDto: CreateAllocatedWorkoutDto = {
      name: `${allocatedWorkout.name} (Copy)`,
      workoutId: allocatedWorkout.workoutId || undefined,
      programId: programId || allocatedWorkout.programId || undefined,
      order: allocatedWorkout.order || undefined,
      note: allocatedWorkout.note || undefined,
      allocatedExercises: allocatedWorkout.allocatedExercises?.map(ae => ({
        exerciseId: ae.exerciseId || undefined,
        exerciseData: ae.exerciseData || undefined,
        sets: ae.sets,
        order: ae.order || undefined,
        notes: ae.notes || undefined,
      })),
    };
    
    return this.create(createDto);
  }
}
