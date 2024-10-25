import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configApplication } from './common/configs/config-application';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configApplication(app);

  await app.listen(3000);
}

bootstrap();
