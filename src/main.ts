import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('HAGL Club API')
    .setDescription(
      'REST API documentation for Hoang Anh Gia Lai Football Club',
    )
    .setVersion('1.0')
    .addTag('Teams', 'HAGL club and match information')
    // Quan trọng: Thêm dòng này để Swagger nhận đúng domain khi lên Render hoặc chạy Local
    .addServer(process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3000}`, 'Server')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Sửa lại thành 'api/docs' khớp với global prefix 'api'
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
  console.log(`Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();