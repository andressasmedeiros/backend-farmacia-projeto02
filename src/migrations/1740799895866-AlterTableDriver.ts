import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterTableDriver1740798704187 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "movements",
            new TableColumn({
                name: "driver_id",
                type: "int",
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
            "movements",
            new TableForeignKey({
                columnNames: ["driver_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "drivers",
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("movements");
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("driver_id") !== -1
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey("movements", foreignKey);
        }

        await queryRunner.dropColumn("movements", "driver_id");
    }
}
