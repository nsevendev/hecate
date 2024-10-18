import { DataSource } from 'typeorm'
import * as path from 'path'

/**
 * DataSource pour les tests Jest
 * ce datasource reflete la config typeorm pour les tests
 * le typeorm de reference est dans le dossuer database-test
 */
export const dataSourceJest = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_TEST_URL, // Prendre l'URL de la base de test
    entities: [path.join(__dirname, '**', '*.entity.{ts,js}')], // Charger toutes les entités
    synchronize: true, // Synchronisation conditionnelle
    logging: false, // Désactiver les logs pour les tests
})
