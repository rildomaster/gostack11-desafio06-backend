import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateRalationsTransactionsWithCategory1587506644653
  implements MigrationInterface {
  private tableName = 'transactions';

  private foreignKeyName = 'TransactionCategoryId';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: this.foreignKeyName,
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, this.foreignKeyName);
  }
}
