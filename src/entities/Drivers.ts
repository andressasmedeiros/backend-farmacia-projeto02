import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("drivers")
export class Drivers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, name: "full_address" })
    fullAddress: string;

    @Column({ type: "varchar", length: 30 })
    document: string;

    @Column({ default: new Date(), name: "created_at" })
    createdAt: Date;

    @Column({ default: new Date(), name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.drivers, { onDelete: "CASCADE" })
    @JoinColumn({ name: "users_id" })
    user: User;
}
