import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableMovements1740437622126 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "movements",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "quantity",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["PENDING", "IN_PROGRESS", "FINISHED"],
                        default: "'PENDING'",
                        isNullable: false,
                    },
                    {
                        name: "product_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "destination_branch_id",
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
            "movements",
            new TableForeignKey({
                columnNames: ["destination_branch_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "branches",
                onDelete: "CASCADE",
            })
        );
        await queryRunner.createForeignKey(
            "movements",
            new TableForeignKey({
                columnNames: ["product_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "products",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movements");
        await queryRunner.dropForeignKey("movements", "destination_branch_id");
        await queryRunner.dropForeignKey("movements", "products_id");
    }

}