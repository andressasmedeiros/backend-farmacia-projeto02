import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from "typeorm";
import { Branches } from "./Branches";
import { Movements } from "./Movements";

@Entity("products")
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200 })
    name: string;

    @Column({ type: "int" })
    amount: number;

    @Column({ type: "varchar", length: 200 })
    description: string;

    @Column({ type: "varchar", length: 200 })
    url_cover: string;

    @ManyToOne(() => Branches, (branches) => branches.products, { onDelete: "CASCADE" })
    @JoinColumn({ name: "branches_id" })
    branch: Branches;

    @OneToMany(() => Movements, (movements) => movements.product, { onDelete: "CASCADE" })
    movements: Movements[];

    @Column({ default: new Date(), name: "created_at" })
    createdAt: Date;

    @Column({ default: new Date(), name: "updated_at" })
    updatedAt: Date;
}
