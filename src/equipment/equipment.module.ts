import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import {PrismaService} from "../prisma/prisma.service";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
