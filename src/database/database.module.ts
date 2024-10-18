import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], // Pour accéder aux variables d'environnement
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get<string>('DATABASE_URL'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/../migrations/*{.ts,.js}'],
                autoLoadEntities: true,
                //synchronize: configService.get<string>('SYNC_DATABASE') === 'true', // Synchronisation conditionnelle
                logging: configService.get<string>('SYNC_DATABASE') === 'true',
            }),
        }),
    ],
})
export class DatabaseModule {}
