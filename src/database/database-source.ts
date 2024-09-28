import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: configService.get<string>('DATABASE_URL'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: false,
})
