import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // Enables detailed Prisma logs
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
