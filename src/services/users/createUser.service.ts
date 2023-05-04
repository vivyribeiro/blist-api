import "dotenv/config";
import { userRepository } from "../../repositories";
import { iUser, iUserCreate } from "../../interfaces/users";
import { sendConfirmationEmailService } from "../mailHandler";

const createUserService = async (userData: iUserCreate): Promise<string> => {
	const user: iUser = userRepository.create(userData);
	await userRepository.save(user);

	await sendConfirmationEmailService(user);

	return "User was registered successfully! Please check your email.";
};

export default createUserService;
