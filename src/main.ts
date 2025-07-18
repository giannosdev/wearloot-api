import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {

    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3100);
  } catch (err) {
    console.error('Error starting server:', err);
  }
}
bootstrap();
