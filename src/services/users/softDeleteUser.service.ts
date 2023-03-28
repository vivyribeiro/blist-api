import { AppError } from "../../errors";
import { userRepository } from "../../repositories";

const softDeleteUserService = async (foundUser: any): Promise<void> => {
	if (foundUser.deletedAt) {
		throw new AppError("User already deleted.", 409);
	}

	await userRepository.softDelete(foundUser.id);
};

export default softDeleteUserService;
