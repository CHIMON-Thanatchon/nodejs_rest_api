import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';
import { AppModule } from './app.module';
import { normalizeEnvValue } from './config/env.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const pool = new Pool({
    host: normalizeEnvValue(configService.get<string>('DB_HOST')),
    port: configService.get<number>('DB_PORT') ?? 5432,
    user: normalizeEnvValue(configService.get<string>('DB_USER')),
    password: normalizeEnvValue(configService.get<string>('DB_PASSWORD')),
    database: normalizeEnvValue(configService.get<string>('DB_NAME')),
  });

  const PgSession = connectPgSimple(session);
  app.use(cookieParser());
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: 'user_sessions',
        createTableIfMissing: true,
      }),
      name: 'sid',
      secret: configService.getOrThrow<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
