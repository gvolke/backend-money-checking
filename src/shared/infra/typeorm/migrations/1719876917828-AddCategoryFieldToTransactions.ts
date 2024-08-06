import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCategoryFieldToTransactions1719876917828
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "transactions",
      new TableColumn({ name: "category", type: "varchar", isNullable: true })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn("transactions", "category");
  }
}
