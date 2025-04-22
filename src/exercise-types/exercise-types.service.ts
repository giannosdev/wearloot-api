import { Injectable } from '@nestjs/common';
import { CreateExerciseTypeDto } from './dto/create-exercise-type.dto';
import { UpdateExerciseTypeDto } from './dto/update-exercise-type.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExerciseTypeService {
  constructor(private prisma: PrismaService) {}

  create(createExerciseTypeDto: CreateExerciseTypeDto) {
    return this.prisma.exerciseType.create({
      data: {
        ...createExerciseTypeDto,
      },
    });
  }

  findAll() {
    return this.prisma.exerciseType.findMany();
  }

  findOne(id: string) {
    return this.prisma.exerciseType.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateExerciseTypeDto: UpdateExerciseTypeDto) {
    return this.prisma.exerciseType.update({
      where: {
        id: id,
      },
      data: {
        ...updateExerciseTypeDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.exerciseType.delete({
      where: {
        id: id,
      },
    });
  }
}
