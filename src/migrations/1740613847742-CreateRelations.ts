import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRelations1740613847742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_roles',
                columns: [
                    {
                        name: 'userId',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'roleId',
                        type: 'int',
                        isPrimary: true
                    }
                ]
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'permission_role',
                columns: [
                    {
                        name: 'permissionId',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'roleId',
                        type: 'int',
                        isPrimary: true
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('permission_role');
        await queryRunner.dropTable('user_roles');
    }

}
