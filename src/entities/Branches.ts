import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";
import { Products } from "./Products";

@Entity("branches")
export class Branches {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255, name: "full_address" })
  fullAddress: string;

  @Column({ nullable: false, length: 30 })
  document: string;

  @Column({ default: new Date(), name: "created_at" })
  createdAt: Date;

  @Column({ default: new Date(), name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.branches, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: "users_id" })
  user: User;

  @OneToMany(() => Products, (products) => products.branch)
  products: Products[];
  movements: any;

}