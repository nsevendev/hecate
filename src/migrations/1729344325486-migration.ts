import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729344325486 implements MigrationInterface {
    name = 'Migration1729344325486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "condition_general" ADD "activate" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "condition_general" DROP COLUMN "activate"`);
    }

}
