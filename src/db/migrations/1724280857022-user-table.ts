import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1724280857022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(
          `CREATE TABLE "user" (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            name  varchar(256) NOT NULL,
            email  varchar(512) NULL,
            CONSTRAINT user_pk PRIMARY KEY (id)
        );`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`);
    }

}
