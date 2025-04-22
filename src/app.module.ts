import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MuscleGroupsModule } from './muscle-groups/muscle-groups.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { ProgramsModule } from './programs/programs.module';
import { GymsModule } from './gyms/gyms.module';
import { ExerciseTypesModule } from './exercise-types/exercise-types.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    MuscleGroupsModule,
    EquipmentModule,
    ExercisesModule,
    WorkoutsModule,
    ProgramsModule,
    GymsModule,
    ExerciseTypesModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.prismaService.$connect();
  }
}
