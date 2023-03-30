import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities";

type iUserRepo = Repository<User>;
type iUserDeepPartial = DeepPartial<User>;

const readUsers = async (): Promise<Array<User>> => {
	const userRepo: iUserRepo = AppDataSource.getRepository(User);
	const usersTotal: number = 5;

	return await userRepo.save(
		Array.from(Array(usersTotal))
			.map((val, index): iUserDeepPartial => {
				const fullName: string = `user${index}`;
				const email: string = `${fullName}@mail.com`;

				return {
					id: expect.any(String),
					fullName,
					email,
					password: "1234",
					telephone: `7599988776${index}`
				};
			})
			.map(({ id, ...el }) => el)
	);
};

export default { readUsers };
