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

	@Column({ length: 11 })
	telephone: string;

	@Column({ length: 70 })
	email: string;

	@CreateDateColumn({ type: "date" })
	createdAt: string;

	@UpdateDateColumn({ type: "date" })
	updatedAt: string;

	@ManyToOne(() => User, user => user.contacts)
	user: User;
}

export default Contact;
