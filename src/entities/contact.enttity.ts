import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne
} from "typeorm";
import User from "./user.enttity";

@Entity("contacts")
class Contact {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 50 })
	fullName: string;

	@Column({ length: 11, unique: true })
	telephone: string;

	@Column({ length: 70, unique: true })
	email: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updatedAt: Date;

	@ManyToOne(() => User, user => user.contacts)
	user: User;
}

export default Contact;
