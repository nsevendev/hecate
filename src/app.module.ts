import { Module } from '@nestjs/common'
import { PingModule } from './ping/ping.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { DatabaseTestModule } from './database-test/database-test.module'

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env.dev.local', isGlobal: true }),
        DatabaseModule,
        PingModule,
        DatabaseTestModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
