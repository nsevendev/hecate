import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggerMiddleware } from './logger/logger.middleware'
import { swaggerService } from './swagger/swagger.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use((req, res, next) => new LoggerMiddleware().use(req, res, next))
    swaggerService(app)
    await app.listen(8000)
}
bootstrap()
