import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728073935473 implements MigrationInterface {
    name = 'Migration1728073935473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ping" ("id" SERIAL NOT NULL, "status" integer NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_b01cab9d614b77bac5973937663" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_image" ("id" SERIAL NOT NULL, "image_id" integer, "project_id" integer, CONSTRAINT "REL_ea110f6fa1259504bc37a36788" UNIQUE ("image_id"), CONSTRAINT "PK_09b0ab9ec6330049e8a59289e32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "techno" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a0753ecac46d9e9eecee06847a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_technos_techno" ("projectId" integer NOT NULL, "technoId" integer NOT NULL, CONSTRAINT "PK_59011eefdb4adbb49ebd659b95a" PRIMARY KEY ("projectId", "technoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2761219fcaa01e21158098d44e" ON "project_technos_techno" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67ff71531fdabcf96bb7497b16" ON "project_technos_techno" ("technoId") `);
        await queryRunner.query(`CREATE TABLE "techno_projects_project" ("technoId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_7bacf1a3e9cf42675c49bd1e7ff" PRIMARY KEY ("technoId", "projectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c3c2e7a6cdaf788d6e5dbb424f" ON "techno_projects_project" ("technoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed91c141e7a16ef9e9b15b8379" ON "techno_projects_project" ("projectId") `);
        await queryRunner.query(`ALTER TABLE "project_image" ADD CONSTRAINT "FK_ea110f6fa1259504bc37a367882" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_image" ADD CONSTRAINT "FK_478c63e70f1825d39b35980634d" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_technos_techno" ADD CONSTRAINT "FK_2761219fcaa01e21158098d44ed" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_technos_techno" ADD CONSTRAINT "FK_67ff71531fdabcf96bb7497b168" FOREIGN KEY ("technoId") REFERENCES "techno"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "techno_projects_project" ADD CONSTRAINT "FK_c3c2e7a6cdaf788d6e5dbb424fd" FOREIGN KEY ("technoId") REFERENCES "techno"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "techno_projects_project" ADD CONSTRAINT "FK_ed91c141e7a16ef9e9b15b83795" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "techno_projects_project" DROP CONSTRAINT "FK_ed91c141e7a16ef9e9b15b83795"`);
        await queryRunner.query(`ALTER TABLE "techno_projects_project" DROP CONSTRAINT "FK_c3c2e7a6cdaf788d6e5dbb424fd"`);
        await queryRunner.query(`ALTER TABLE "project_technos_techno" DROP CONSTRAINT "FK_67ff71531fdabcf96bb7497b168"`);
        await queryRunner.query(`ALTER TABLE "project_technos_techno" DROP CONSTRAINT "FK_2761219fcaa01e21158098d44ed"`);
        await queryRunner.query(`ALTER TABLE "project_image" DROP CONSTRAINT "FK_478c63e70f1825d39b35980634d"`);
        await queryRunner.query(`ALTER TABLE "project_image" DROP CONSTRAINT "FK_ea110f6fa1259504bc37a367882"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed91c141e7a16ef9e9b15b8379"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3c2e7a6cdaf788d6e5dbb424f"`);
        await queryRunner.query(`DROP TABLE "techno_projects_project"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67ff71531fdabcf96bb7497b16"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2761219fcaa01e21158098d44e"`);
        await queryRunner.query(`DROP TABLE "project_technos_techno"`);
        await queryRunner.query(`DROP TABLE "techno"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "project_image"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "ping"`);
    }

}
