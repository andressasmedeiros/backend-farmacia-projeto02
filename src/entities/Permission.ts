import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

export enum Permissions {
    CRIAR_USUARIO = 'CRIAR_USUARIO',
    LISTAR_USUARIO = 'LISTAR_USUARIO',
    LISTAR_USUARIO_POR_ID = 'LISTAR_USUARIO_POR_ID'
  }

@Entity("permissions")
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    description: string;

    @Column({ default: new Date(), name: "created_at" })
    createdAt: Date;

    @Column({ default: new Date(), name: "updated_at" })
    updatedAt: Date;

    @ManyToMany(() => Role, (role) => role.permissions)
    @JoinTable({name: "permission_role"})
    roles: Role[]
}