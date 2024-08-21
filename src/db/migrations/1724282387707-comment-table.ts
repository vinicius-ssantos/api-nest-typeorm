import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentTable1724282387707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(
          `CREATE TABLE comment (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            text TEXT NOT NULL,
            post_id uuid,
            author_id uuid,
            CONSTRAINT comment_pk PRIMARY KEY (id),
            FOREIGN KEY (post_id) REFERENCES "post" (id),
            FOREIGN KEY (author_id) REFERENCES "author" (id)
        );`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS comment;`);
    }

}
