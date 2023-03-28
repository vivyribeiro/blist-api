import { getRounds, hashSync } from "bcryptjs";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
	DeleteDateColumn
} from "typeorm";
import Contact from "./contact.enttity";

@Entity("users")
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 50 })
	fullName: string;

	@Column({ length: 11, unique: true })
	telephone: string;

	@Column({ length: 70, unique: true })
	email: string;

	@Column({ length: 120 })
	password: string;

	@Column({
		name: "role",
		type: "enum",
		enum: ["admin", "client"],
		enumName: "roleEnum",
		default: "client"
	})
	role: "admin" | "client";

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@DeleteDateColumn({ nullable: true, type: "timestamp" })
	deletedAt: Date | null;

	@BeforeInsert()
	@BeforeUpdate()
	hashInsertPassword() {
		const isEncrypted = getRounds(this.password);
		if (!isEncrypted) {
			this.password = hashSync(this.password, 10);
		}
	}

	@OneToMany(() => Contact, contact => contact.user)
	contacts: Contact[];
}

export default User;
