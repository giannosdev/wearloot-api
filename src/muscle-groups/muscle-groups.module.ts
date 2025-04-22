import { Module } from '@nestjs/common';
import { MuscleGroupsService } from './muscle-groups.service';
import { MuscleGroupsController } from './muscle-groups.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  controllers: [MuscleGroupsController],
  providers: [MuscleGroupsService],
})
export class MuscleGroupsModule {}
