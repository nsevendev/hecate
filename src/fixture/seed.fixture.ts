import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { faker } from '@faker-js/faker'
import { PingSeed } from './seeds/ping.seed'
import { PingService } from 'src/ping/app/ping.service'
import { PingRepository } from 'src/ping/infra/ping.repository'

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule)

    const pingRepository = app.get(PingRepository)
    const pingService = app.get(PingService)
    const pingSeed = new PingSeed(pingRepository, pingService)
    const ping = pingSeed.run()
}

bootstrap().catch((error) => {
    console.error("Erreur lors de l'exécution du script de seeding :", error)
    process.exit(1)
})
