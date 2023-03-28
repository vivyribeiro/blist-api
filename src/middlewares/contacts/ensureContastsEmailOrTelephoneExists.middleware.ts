import { Any } from "typeorm";
import { AppError } from "../../errors";
import { contactRepository } from "../../repositories";
import { iContactsCreate } from "../../interfaces/contacts";
import { NextFunction, Request, Response } from "express";

const ensureContastsEmailOrTelephoneExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	let contacts: iContactsCreate = [];

	if (req.method == "PATCH") {
		if (!req.body.email && !req.body.telephone) {
			return next();
		}

		contacts.push(req.body);
	} else {
		contacts = req.body;
	}

	const listEmails = contacts.map(contact => contact.email);
	const listTelephones = contacts.map(contact => contact.telephone);

	if (!listEmails.length && !listTelephones.length) {
		return next();
	}

	let emailsExists, telephonesExists, emailsAndTelephonesExists;

	if (listEmails.length && listTelephones.length) {
		emailsAndTelephonesExists = await contactRepository.findBy({
			email: Any(listEmails),
			telephone: Any(listTelephones)
		});

		if (emailsAndTelephonesExists.length) {
			throw new AppError(
				`The email(s): ${listEmails.join(
					", "
				)} and telephone(s):  ${listTelephones.join(", ")} already exists.`,
				409
			);
		}
	}

	if (listEmails.length) {
		emailsExists = await contactRepository.findBy({
			email: Any(listEmails)
		});

		if (emailsExists.length) {
			throw new AppError(
				`The email(s) already exists: ${listEmails.join(", ")}`,
				409
			);
		}
	}

	if (listTelephones.length) {
		telephonesExists = await contactRepository.findBy({
			telephone: Any(listTelephones)
		});

		if (telephonesExists.length) {
			throw new AppError(
				`The telephone(s) already exists: ${listTelephones.join(", ")}`,
				409
			);
		}
	}

	return next();
};

export default ensureContastsEmailOrTelephoneExistsMiddleware;
