import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle('GingerBread')
    .setDescription('GingerBread is the top notch food on demand website for your frequent needs')
    .setVersion('1.0')
    .addTag('gingerBread')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(`${process.env.PORT}`, `0.0.0.0`);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
