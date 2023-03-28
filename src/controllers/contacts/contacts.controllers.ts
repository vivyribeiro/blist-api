import { Request, Response } from "express";
import {
	iContactUpdate,
	iContactsCreate,
	iContactResponse
} from "../../interfaces/contacts";
import { iUser, paginationList } from "../../interfaces/users";
import {
	updateContactService,
	deleteContactService,
	listUserContactsService,
	createUserContactsService
} from "../../services/contacts";

const createUserContactsController = async (req: Request, res: Response) => {
	const foundUser: iUser = req.foundUser;
	const contacstData: iContactsCreate = req.body;

	const userContacts = await createUserContactsService(contacstData, foundUser);

	return res.status(201).json(userContacts);
};

const listUserContactsController = async (req: Request, res: Response) => {
	const listPagination = req.listPagination;

	const contactsPagination: paginationList = await listUserContactsService(
		listPagination
	);

	return res.json(contactsPagination);
};

const updateContactController = async (req: Request, res: Response) => {
	const contactData: iContactUpdate = req.body;
	const foundContact: iContactResponse = req.foundContact;

	const updatedContact = await updateContactService(contactData, foundContact);

	return res.json(updatedContact);
};

const deleteContactController = async (req: Request, res: Response) => {
	const foundContact = req.foundContact;

	await deleteContactService(foundContact);

	return res.status(204).json();
};

export {
	updateContactController,
	deleteContactController,
	listUserContactsController,
	createUserContactsController
};
