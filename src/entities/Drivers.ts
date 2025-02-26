import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity("drivers")
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    full_address: string;

    @Column({ type: "varchar", length: 30 })
    document: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.drivers, { onDelete: "CASCADE" })
    @JoinColumn({ name: "users_id" })
    user: User;
}
