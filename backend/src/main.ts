import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

const port = process.env.PORT || 3095;

declare const module: any;

async function bootstrap() {
  // NestExpressAppliction => express에서 쓰는거 활용하기 위해서
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  // * CORS * //
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: ['https://sleact.nodebird.com'],
      credentials: true
    });
  } else {
    app.enableCors({
      origin: true,
      credentials: true
    });
  }

  // * 브라우저측의 파일 참조를 위한 설정 START * //
  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '..', '..', 'uploads')
    : path.join(__dirname, '..', 'uploads'),
    {
      prefix: '/uploads'
    }
  );
  app.useStaticAssets(
    process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '..', '..', 'public')
    : path.join(__dirname, '..', 'public'),
    {
      prefix: '/dist'
    }
  );
  // * 브라우저측의 파일 참조를 위한 설정 END * //

  // * SWAGGER START * //
  const config = new DocumentBuilder()
    .setTitle('slack-socket API')
    .setDescription('The slack-socket API description')
    .setVersion('1.0')
    .addTag('slack-socket')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // * SWAGGER END * //

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
  console.log(`server run in port ${port}`)

  if(module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
