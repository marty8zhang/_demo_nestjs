import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1724303670807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "user"
            ADD COLUMN "title" varchar
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "user"
            DROP COLUMN "title"
    `);
  }
}
