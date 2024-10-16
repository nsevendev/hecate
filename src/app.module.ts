import { Module } from '@nestjs/common'
import { PingModule } from './ping/ping.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { DatabaseTestModule } from './database-test/database-test.module'
import { ImageModule } from './image/image.module'
import { TechnoModule } from './techno/techno.module'
import { ProjectModule } from './project/project.module'

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env.dev.local', isGlobal: true }),
        DatabaseModule,
        DatabaseTestModule,
        PingModule,
        ImageModule,
        TechnoModule,
        ProjectModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
