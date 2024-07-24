import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json } from 'body-parser';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  console.log('Enabling API versioning');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const configService = app.get<ConfigService>(ConfigService);
  const isDev = configService.get('EMPOWER_ENV') == 'development';

  console.log('Registering global interceptors');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  console.log('Enabling shutdown hooks');
  app.enableShutdownHooks();

  const requestEntityPayloadSize = configService.get<string>(
    'EMPOWER_REQUEST_ENTITY_PAYLOAD_SIZE',
    '3mb',
  );
  console.log(
    'Setting request entity payload size limit to ' + requestEntityPayloadSize,
  );
  app.use(json({ limit: requestEntityPayloadSize }));

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
