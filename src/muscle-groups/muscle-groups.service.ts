import { Injectable } from '@nestjs/common';
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto';
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MuscleGroupsService {
  constructor(private prisma: PrismaService) {}

  create(createMuscleGroupDto: CreateMuscleGroupDto) {
    return this.prisma.muscleGroup.create({
      data: {
        ...createMuscleGroupDto,
      },
    });
  }

  findAll() {
    return this.prisma.muscleGroup.findMany();
  }

  findOne(id: string) {
    return this.prisma.muscleGroup.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateMuscleGroupDto: UpdateMuscleGroupDto) {
    return this.prisma.muscleGroup.update({
      where: {
        id: id,
      },
      data: {
        ...updateMuscleGroupDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.muscleGroup.delete({
      where: {
        id: id,
      },
    });
  }
}
