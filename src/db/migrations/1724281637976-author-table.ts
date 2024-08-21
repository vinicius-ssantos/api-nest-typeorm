import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthorTable1724281637976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(
          `CREATE TABLE author (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            tags VARCHAR(255),
            surname VARCHAR(255),
            complete_name VARCHAR(255),
            user_id uuid,
            CONSTRAINT author_pk PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES "user" (id)
        );`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS author;`);
    }

}
