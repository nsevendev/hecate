import { DataSource, QueryRunner } from 'typeorm'
import { dataSourceJest } from '../src/datasource-jest'

/**
 * configuration de jest globale pour les tests
 * chaque test utilises ses fonctions en plus de celle qu'il possède
 *
 * avant chaque test global, on initialise la dataSource
 * avant chaque test unit (IT), on initialise le queryRunner
 * après chaque test unit (IT), on rollback la transaction et on release le queryRunner
 * après chaque test global, on détruit la dataSource
 */

let dataSource: DataSource
let queryRunner: QueryRunner

beforeAll(async () => {
    dataSource = await dataSourceJest.initialize()
})

beforeEach(async () => {
    queryRunner = dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
})

afterEach(async () => {
    await queryRunner.rollbackTransaction()
    await queryRunner.release()

    const entities = dataSource.entityMetadatas

    for (const entity of entities) {
        const repository = dataSource.getRepository(entity.name)
        await repository.query(`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`)
    }
})

afterAll(async () => {
    await dataSource.destroy()
})
