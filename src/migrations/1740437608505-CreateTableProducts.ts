import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableProducts1740437608505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "200",
                        isNullable: false,
                    },
                    {
                        name: "amount",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "200",
                        isNullable: false,
                    },
                    {
                        name: "url_cover",
                        type: "varchar",
                        length: "200",
                        isNullable: false,
                    },
                    {
                        name: "branches_id",
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
            "products",
            new TableForeignKey({
                columnNames: ["branches_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "branches",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
        await queryRunner.dropForeignKey("products", "branches_id");
    }

}
