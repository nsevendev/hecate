import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        ConfigModule, // Utilisé pour charger les variables d'environnement
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], // Pour accéder aux variables d'environnement
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get<string>('DATABASE_TEST_URL'), // Utilisation de DATABASE_URL
                entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Chargement des entités
                synchronize: configService.get<string>('SYNC_DATABASE') === 'true', // Synchronisation conditionnelle
            }),
        }),
    ],
})
export class DatabaseTestModule {}
