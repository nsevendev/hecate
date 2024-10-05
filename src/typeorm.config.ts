import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config()

// config pour les migrations
export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
    migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
    migrationsTableName: 'table_migrations',
    migrationsRun: false,
})
