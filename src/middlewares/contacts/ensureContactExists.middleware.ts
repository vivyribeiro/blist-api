import { AppError } from "../../errors";
import { NextFunction, Request, Response } from "express";
import { validIdSchema } from "../../schemas/users/users.schemas";
import { contactRepository } from "../../repositories";
import { iContact, iContactResponse } from "../../interfaces/contacts";

const ensureContactExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { id } = req.params;

	validIdSchema.parse({ id });

	const foundContact: iContact | null = await contactRepository.findOne({
		where: {
			id
		},
		relations: {
			user: true
		}
	});

	if (!foundContact) {
		throw new AppError("Contact was not found.", 404);
	}

	const { user, ...contact } = foundContact;

	req.foundUser = user;
	req.foundContact = contact;

	return next();
};

export default ensureContactExistsMiddleware;
