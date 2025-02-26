import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
} from "typeorm";
import { Products } from "./Products";
import { Branches } from "./Branches";

export enum MovementStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED"
}

@Entity("movements")
export class Movement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    quantity: number;

    @Column({
        type: "enum",
        enum: MovementStatus,
        default: MovementStatus.PENDING
    })
    status: MovementStatus;

    @ManyToOne(() => Products, (products) => products.movements, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id" })
    product: Products;

    @ManyToOne(() => Branches, (branches) => branches.movements, { onDelete: "CASCADE" })
    @JoinColumn({ name: "destination_branch_id" })
    destinationBranches: Branches;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
