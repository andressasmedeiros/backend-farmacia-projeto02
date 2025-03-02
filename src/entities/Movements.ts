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
import { Drivers } from "./Drivers";

export enum MovementStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED"
}

@Entity("movements")
export class Movements {
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

    @ManyToOne(() => Drivers, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "driver_id" })
    driver?: Drivers;

    @ManyToOne(() => Branches, (branches) => branches.movements, { onDelete: "CASCADE" })
    @JoinColumn({ name: "destination_branch_id" })
    destinationBranches: Branches;

    @Column({ default: new Date(), name: "created_at" })
    createdAt: Date;

    @Column({ default: new Date(), name: "updated_at" })
    updatedAt: Date;
}
