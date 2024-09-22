import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { DataSource } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'

describe('DatabaseModule', () => {
    let dataSource: DataSource

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ envFilePath: '.env.dev.local', isGlobal: true }),
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        type: 'postgres',
                        url: configService.get<string>('DATABASE_URL'),
                        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                        synchronize: configService.get<string>('SYNC_DATABASE') === 'true',
                    }),
                }),
            ],
        }).compile()

        dataSource = module.get(DataSource)
    })

    afterEach(async () => {
        await dataSource.destroy()
    })

    it('DataBaseSource est defini', () => {
        expect(dataSource).toBeDefined()
    })

    it('Database connexion réussie', () => {
        expect(dataSource).toBeInstanceOf(DataSource)
        expect(dataSource.isInitialized).toBe(true)
    })
})
