import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  providers: [UserService],
  exports: [UserService], // Export UserService to make it available in other modules
})
export class UserModule {}
