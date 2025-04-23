import { Module } from '@nestjs/common';
import { AllocatedWorkoutsService } from './allocated-workouts.service';
import { AllocatedWorkoutsController } from './allocated-workouts.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AllocatedWorkoutsController],
  providers: [AllocatedWorkoutsService],
  exports: [AllocatedWorkoutsService],
})
export class AllocatedWorkoutsModule {}
