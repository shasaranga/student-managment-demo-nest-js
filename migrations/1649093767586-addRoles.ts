import { User_Role } from 'src/common/enums/roles-enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRoles1649093767586 implements MigrationInterface {
  private roles: string[] = Object.keys(User_Role);
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const role of this.roles) {
      await queryRunner.query(`INSERT INTO "role" ("name") VALUES ('${role}')`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const role of this.roles) {
      await queryRunner.query(`DELETE FROM "role" WHERE "name"= '${role}'`);
    }
  }
}
