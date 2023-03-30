import { Request, Response } from "express";
import {
	iContactUpdate,
	iContactCreate,
	iContactResponse
} from "../../interfaces/contacts";
import { iUser, paginationList } from "../../interfaces/users";
import {
	updateContactService,
	deleteContactService,
	listUserContactsService,
	createUserContactService
} from "../../services/contacts";

const createUserContactController = async (req: Request, res: Response) => {
	const foundUser: iUser = req.foundUser;
	const contacstData: iContactCreate = req.body;

	const userContacts = await createUserContactService(contacstData, foundUser);

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
	createUserContactController
};
