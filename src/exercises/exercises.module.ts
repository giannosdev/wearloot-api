import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
