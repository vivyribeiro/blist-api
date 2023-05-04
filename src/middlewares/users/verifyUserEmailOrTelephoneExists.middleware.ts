import { Not } from "typeorm";
import { AppError } from "../../errors";
import { userRepository } from "../../repositories";
import { NextFunction, Request, Response } from "express";

const verifyUserEmailOrTelephoneExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { email, telephone } = req.body;
	const user = req.foundUser;

	if (!email && !telephone) {
		return next();
	}

	let emailExists, telephoneExists, emailAndTelephoneExists;

	if (email && telephone) {
		if (req.method == "PATCH") {
			emailAndTelephoneExists = await userRepository.findOne({
				where: {
					email,
					telephone,
					id: Not(user.id)
				}
			});
		} else {
			emailAndTelephoneExists = await userRepository.findOne({
				where: {
					email,
					telephone
				}
			});
		}

		if (emailAndTelephoneExists) {
			throw new AppError("The email and telephone already exists", 409);
		}
	}

	if (email) {
		if (req.method == "PATCH") {
			emailExists = await userRepository.findOne({
				where: {
					email,
					id: Not(user.id)
				}
			});
		} else {
			emailExists = await userRepository.findOne({
				where: {
					email
				}
			});
		}

		if (emailExists) {
			throw new AppError("The email already exists", 409);
		}
	}

	if (telephone) {
		if (req.method == "PATCH") {
			telephoneExists = await userRepository.findOne({
				where: {
					telephone,
					id: Not(user.id)
				}
			});
		} else {
			telephoneExists = await userRepository.findOne({
				where: {
					telephone
				}
			});
		}

		if (telephoneExists) {
			throw new AppError("The telephone already exists", 409);
		}
	}

	return next();
};

export default verifyUserEmailOrTelephoneExistsMiddleware;
