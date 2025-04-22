import { Module } from '@nestjs/common';
import { ExerciseTypeService } from './exercise-types.service';
import { ExerciseTypesController } from './exercise-types.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ExerciseTypesController],
  providers: [ExerciseTypeService],
})
export class ExerciseTypesModule {}
