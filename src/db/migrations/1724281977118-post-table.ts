import { MigrationInterface, QueryRunner } from "typeorm";

export class PostTable1724281977118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(
          `CREATE TABLE post (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            title VARCHAR(255) NOT NULL,
            text TEXT NOT NULL,
            author_id uuid,
            CONSTRAINT post_pk PRIMARY KEY (id),
            FOREIGN KEY (author_id) REFERENCES author (id)
        );`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS post;`);
    }

}
