import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Thiết lập global prefix cho API
  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('HAGL Club API')
    .setDescription(
      'REST API documentation for Hoang Anh Gia Lai Football Club',
    )
    .setVersion('1.0')
    .addTag('Teams', 'HAGL club and match information')
    .addServer(process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3000}`, 'Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Đổi lại setup thành 'api/docs' để ép đường dẫn cố định là /api/docs bất kể global prefix
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
  console.log(`Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();