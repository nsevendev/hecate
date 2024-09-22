import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

describe('DatabaseTestModule', () => {
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
                        url: configService.get<string>('DATABASE_TEST_URL'),
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

    it('DataBaseSource test est defini', () => {
        expect(dataSource).toBeDefined()
    })

    it('Database test connexion réussie', () => {
        expect(dataSource).toBeInstanceOf(DataSource)
        expect(dataSource.isInitialized).toBe(true)
    })
})
