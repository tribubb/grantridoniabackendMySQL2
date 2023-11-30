// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// IMPDEV: After multiple iterations (including trying DynamoDB) I have settled on TypeORM (in AppModule)
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const frontendURL = configService.get<string>('FRONTEND_URL') || 'http://localhost:3000'
    app.enableCors({
        origin: frontendURL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
