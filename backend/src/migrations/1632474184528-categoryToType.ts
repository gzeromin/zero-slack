import {MigrationInterface, QueryRunner} from "typeorm";

export class categoryToType1632474184528 implements MigrationInterface {
  name = 'categoryToType1632474184528'

  public async up(queryRunner: QueryRunner): Promise<void> { //change
    await queryRunner.query(
      `ALTER TABLE mentions RENAME COLUMN category TO type`
    );
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> { //rollback
    await queryRunner.query(
      `ALTER TABLE mentions RENAME COLUMN type TO category`
    );
  }

}
