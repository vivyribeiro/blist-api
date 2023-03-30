import { AppError } from "../errors";
import { NextFunction, Request, Response } from "express";
import { contactRepository, userRepository } from "../repositories";

const ensureEmailOrTelephoneExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { email, telephone } = req.body;

	if (!email && !telephone) {
		return next();
	}

	let repository;

	if (req.baseUrl == "/users") {
		repository = userRepository;
	} else {
		repository = contactRepository;
	}

	let emailExists, telephoneExists, emailAndTelephoneExists;

	if (email && telephone) {
		emailAndTelephoneExists = await repository?.findOne({
			where: {
				email,
				telephone
			}
		});

		if (emailAndTelephoneExists) {
			throw new AppError("The email and telephone already exists", 409);
		}
	}

	if (email) {
		emailExists = await repository?.findOne({
			where: {
				email
			}
		});

		if (emailExists) {
			throw new AppError("The email already exists", 409);
		}
	}

	if (telephone) {
		telephoneExists = await repository?.findOne({
			where: {
				telephone
			}
		});

		if (telephoneExists) {
			throw new AppError("The telephone already exists", 409);
		}
	}

	return next();
};

export default ensureEmailOrTelephoneExistsMiddleware;
