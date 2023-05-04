import { Not, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { contactRepository } from "../../repositories";
import { AppError } from "../../errors";

const verifyContactEmailOrTelephoneExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { email, telephone } = req.body;

	const user = req.foundUser;
	const contact = req.foundContact;

	if (!email && !telephone) {
		return next();
	}

	let emailExists, telephoneExists, emailAndTelephoneExists;

	if (email && telephone) {
		if (req.method == "PATCH") {
			emailAndTelephoneExists = await contactRepository.findOne({
				where: {
					email,
					telephone,
					id: Not(contact.id),
					user: {
						id: user.id
					}
				},
				relations: {
					user: true
				}
			});
		} else {
			emailAndTelephoneExists = await contactRepository.findOne({
				where: {
					email,
					telephone,
					user: {
						id: user.id
					}
				},
				relations: {
					user: true
				}
			});
		}

		if (emailAndTelephoneExists) {
			throw new AppError("The email and telephone already exists", 409);
		}
	}

	if (email) {
		if (req.method == "PATCH") {
			emailExists = await contactRepository.findOne({
				where: {
					email,
					id: Not(contact.id),
					user: {
						id: user.id
					}
				},
				relations: {
					user: true
				}
			});
		} else {
			emailExists = await contactRepository.findOne({
				where: {
					email,
					user: {
						id: user.id
					}
				},
				relations: {
					user: true
				}
			});
		}

		if (emailExists) {
			throw new AppError("The email already exists", 409);
		}
	}

	if (telephone) {
		if (req.method == "PATCH") {
			telephoneExists = await contactRepository.findOne({
				where: {
					telephone,
					id: Not(contact.id),
					user: {
						id: user.id
					}
				},
				relations: {
					user: true
				}
			});
		} else {
			telephoneExists = await contactRepository.findOne({
				where: {
					telephone,
					user: {
						id: user.id
					}
				},
				relations: {
					user: true
				}
			});
		}

		if (telephoneExists) {
			throw new AppError("The telephone already exists", 409);
		}
	}

	return next();
};

export default verifyContactEmailOrTelephoneExistsMiddleware;
