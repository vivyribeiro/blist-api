import { Repository } from "typeorm";
import { Contact, User } from "../entities";
import { AppDataSource } from "../data-source";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const contactRepository: Repository<Contact> =
	AppDataSource.getRepository(Contact);

export { userRepository, contactRepository };
