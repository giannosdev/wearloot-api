import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';

@Injectable()
export class GymsService {
  constructor(private prisma: PrismaService) {}

  async create(createGymDto: CreateGymDto) {
    return this.prisma.gym.create({
      data: {
        name: createGymDto.name,
        address: createGymDto.address,
      },
    });
  }

  async findAll() {
    return this.prisma.gym.findMany({
      include: {
        users: true, // Include users belonging to the gym
        programs: true, // Include programs associated with the gym
      },
    });
  }

  async findOne(id: string) {
    const gym = await this.prisma.gym.findUnique({
      where: { id },
      include: {
        users: true, // Include users belonging to the gym
        programs: true, // Include programs associated with the gym
      },
    });

    if (!gym) {
      throw new NotFoundException(`Gym with ID ${id} not found`);
    }

    return gym;
  }

  async update(id: string, updateGymDto: UpdateGymDto) {
    const existingGym = await this.prisma.gym.findUnique({ where: { id } });

    if (!existingGym) {
      throw new NotFoundException(`Gym with ID ${id} not found`);
    }

    return this.prisma.gym.update({
      where: { id },
      data: {
        name: updateGymDto.name,
        address: updateGymDto.address,
      },
    });
  }

  async remove(id: string) {
    const existingGym = await this.prisma.gym.findUnique({ where: { id } });

    if (!existingGym) {
      throw new NotFoundException(`Gym with ID ${id} not found`);
    }

    return this.prisma.gym.delete({
      where: { id },
    });
  }
}
