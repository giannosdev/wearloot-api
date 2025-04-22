import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return this.prisma.equipment.create({
      data: {
        ...createEquipmentDto,
      },
    });
  }

  findAll() {
    return this.prisma.equipment.findMany();
  }

  findOne(id: string) {
    return this.prisma.equipment.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    return this.prisma.equipment.update({
      where: {
        id: id,
      },
      data: {
        ...updateEquipmentDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.equipment.delete({
      where: {
        id: id,
      },
    });
  }
}
