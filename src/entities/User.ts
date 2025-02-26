import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Branches } from "./Branches";
import { Drivers } from "./Drivers";
import { Role } from "./Role";

export enum Profile {
  DRIVER = 'DRIVER',
  BRANCH = 'BRANCH',
  ADMIN = 'ADMIN',
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: Profile,
  })
  profile: Profile;

  @Column({ unique: true, nullable: false, length: 150 })
  email: string;

  @Column({ nullable: false, length: 150, name: "password_hash" })
  passwordHash: string;

  @Column({ default: true })
  status: boolean;

  @Column({ default: new Date(), name: "created_at" })
  createdAt: Date;

  @Column({ default: new Date(), name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Branches, (branches) => branches.user)
  branches: Branches;

  @OneToMany(() => Drivers, (drivers) => drivers.user)
  drivers: Drivers[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: "user_roles" })
  roles: Role[]
}