import { iUser, iUserReport } from "../../interfaces/users";
import { userRepository } from "../../repositories";
import { userReportSchema } from "../../schemas/users";

const retrieveUserReportService = async (user: iUser): Promise<iUserReport> => {
	const userContactsList = await userRepository.findOne({
		where: {
			id: user.id
		},
		relations: {
			contacts: true
		}
	});

	return userReportSchema.parse(userContactsList);
};

export default retrieveUserReportService;
