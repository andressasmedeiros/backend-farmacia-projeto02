import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn} from "typeorm";
import { Branches } from "./Branches";

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

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
    movements: any;
}
