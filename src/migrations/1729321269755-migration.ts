import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729321269755 implements MigrationInterface {
    name = 'Migration1729321269755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_cg" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article_cg" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article_cg" ADD "conditionGeneralId" integer`);
        await queryRunner.query(`ALTER TABLE "article_cg" ADD CONSTRAINT "FK_4f0ebb0adc02a1069712ee6689d" FOREIGN KEY ("conditionGeneralId") REFERENCES "condition_general"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_cg" DROP CONSTRAINT "FK_4f0ebb0adc02a1069712ee6689d"`);
        await queryRunner.query(`ALTER TABLE "article_cg" DROP COLUMN "conditionGeneralId"`);
        await queryRunner.query(`ALTER TABLE "article_cg" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "article_cg" DROP COLUMN "title"`);
    }

}
