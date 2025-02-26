import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Branches } from "./Branches";
import { Driver } from "./Drivers";

export enum Profile {
  DRIVER = 'DRIVER',
  BRANCHE = 'BRANCHE',
  ADMIN = 'ADMIN',
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

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

  @Column({ nullable: false, length: 150 })
  password_hash: string;

  @Column({ default: true })
  status: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @OneToMany(()=> Branches, (branches) => branches.user)
  branches: Branches;

  @OneToMany(() => Driver, (driver) => driver.user)
  drivers: Driver[];
}