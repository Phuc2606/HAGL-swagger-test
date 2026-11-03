
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Prefix cho tất cả API
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('HAGL Club API')
    .setDescription(
      'REST API documentation for Hoang Anh Gia Lai Football Club',
    )
    .setVersion('1.0')
    .addTag('Teams', 'HAGL club and match information')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger truy cập tại /api/docs
  SwaggerModule.setup('api/docs', app, document, {
    useGlobalPrefix: false,
  });

  // Route trang chủ
  app.getHttpAdapter().get('/', (req, res) => {
    res.redirect('/api/docs');
  });

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
  console.log(`Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();
