import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableBranches1740437570915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "branches",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "full_address",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "document",
                        type: "varchar",
                        length: "30",
                        isNullable: false,
                    },
                    {
                        name: "users_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ]
            })
        );
        await queryRunner.createForeignKey(
            "branches",
            new TableForeignKey({
                columnNames: ["users_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("branches");
        await queryRunner.dropForeignKey("branches", "users_id");
    }

}
