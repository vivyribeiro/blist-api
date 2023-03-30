import { DeepPartial, Repository } from "typeorm";
import { User, Contact } from "../../../entities";
import { AppDataSource } from "../../../data-source";

type iUserRepo = Repository<User>;
type iUserDeepPartial = DeepPartial<User>;
type iContactRepo = Repository<Contact>;
type iContactDeepPartial = DeepPartial<Contact>;

const readUsers = async (): Promise<Array<Contact>> => {
	const userRepo: iUserRepo = AppDataSource.getRepository(User);
	const contactRepo: iContactRepo = AppDataSource.getRepository(Contact);
	const contactsTotal: number = 5;

	const user: iUserDeepPartial = await userRepo.save({
		fullName: "Isabelly Ribeiro",
		email: "isa@mail.com",
		telephone: "75983479825",
		password: "123456",
		role: "client"
	});

	return await contactRepo.save(
		Array.from(Array(contactsTotal))
			.map((val, index): iContactDeepPartial => {
				const fullName: string = `contact${index}`;
				const email: string = `${fullName}@mail.com`;

				return {
					id: expect.any(String),
					fullName,
					email,
					telephone: `7599988776${index},`,
					user
				};
			})
			.map(({ id, ...el }) => el)
	);
};

export default { readUsers };
