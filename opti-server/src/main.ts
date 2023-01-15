import { BootStrapService } from './bootstrap.service';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const PORT = process.env.PORT || null;
    if (!PORT) throw new Error('No port specified');

    app.enableCors({
      origin: (origin, cb) => {
        cb(null, true);
      },
      allowedHeaders:
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
      methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    });

    const options = new DocumentBuilder()
      .setTitle('Cars api')
      .setVersion('1.0.0')
      .build();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: {
          enableCircularCheck: true,
        },
      }),
    );

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        enableCircularCheck: true,
        enableImplicitConversion: true,
        exposeUnsetFields: false,
      }),
    );

    app.setGlobalPrefix('api');

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, document);

    const bootstrapService = app.get(BootStrapService);

    await bootstrapService.bootstrap();

    await app.listen(PORT);
  } catch (error) {
    console.log('Global express level error:', error);
  }
}
bootstrap();
