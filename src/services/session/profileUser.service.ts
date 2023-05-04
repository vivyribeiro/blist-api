import { contactRepository } from "../../repositories";
import { userReportSchema } from "../../schemas/users";
import { iUser, iUserReport } from "../../interfaces/users";

const profileUserService = async (foundUser: iUser): Promise<iUserReport> => {
	const contactsList = await contactRepository.find({
		relations: {
			user: true
		},
		where: {
			user: {
				id: foundUser.id
			}
		}
	});

	return userReportSchema.parse({
		...foundUser,
		contacts: contactsList
	});
};

export default profileUserService;
