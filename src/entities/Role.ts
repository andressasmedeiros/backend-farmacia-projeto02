import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Entity("roles")
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    description: string;

    @Column({ default: new Date(), name: "created_at" })
    createdAt: Date;

    @Column({ default: new Date(), name: "updated_at" })
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({
        name: "permission_role", joinColumn: { name: "role_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" },
    })
    permissions: Permission[];
}