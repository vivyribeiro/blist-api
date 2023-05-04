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

	@Column({ nullable: true, type: "text" })
	resetToken: string | null;

	@Column({ default: false })
	isEmailVerified: boolean;

	@Column({ nullable: true, type: "text" })
	confirmationToken: string | null;

	@CreateDateColumn({ type: "date" })
	createdAt: string;

	@UpdateDateColumn({ type: "date" })
	updatedAt: string;

	@DeleteDateColumn({ nullable: true, type: "date" })
	deletedAt: string | null;

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
