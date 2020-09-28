import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CriarTreinamentos1601237328732
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Treinamentos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_funcionarios',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'id_cursos',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'data_treinamento',
            type: 'timestamp with time zone',
          },
          {
            name: 'data_final',
            type: 'timestamp with time zone',
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'Treinamentos',
      new TableForeignKey({
        columnNames: ['id_funcionarios'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Funcionarios',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Treinamentos',
      new TableForeignKey({
        columnNames: ['id_cursos'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Cursos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Treinamentos');
  }
}
