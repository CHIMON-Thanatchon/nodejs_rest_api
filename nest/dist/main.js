"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pg_1 = require("pg");
const app_module_1 = require("./app.module");
const env_util_1 = require("./config/env.util");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const pool = new pg_1.Pool({
        host: (0, env_util_1.normalizeEnvValue)(configService.get('DB_HOST')),
        port: configService.get('DB_PORT') ?? 5432,
        user: (0, env_util_1.normalizeEnvValue)(configService.get('DB_USER')),
        password: (0, env_util_1.normalizeEnvValue)(configService.get('DB_PASSWORD')),
        database: (0, env_util_1.normalizeEnvValue)(configService.get('DB_NAME')),
    });
    const PgSession = (0, connect_pg_simple_1.default)(express_session_1.default);
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        store: new PgSession({
            pool,
            tableName: 'user_sessions',
            createTableIfMissing: true,
        }),
        name: 'sid',
        secret: configService.getOrThrow('SESSION_SECRET'),
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax',
        },
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const port = configService.get('PORT') ?? 3000;
    await app.listen(port);
}
bootstrap();
