import { Request, Response } from "express";
import {
	listUsersService,
	createUserService,
	updateUserService,
	generatePDFService,
	softDeleteUserService
} from "../../services/users";
import {
	iUser,
	iUserCreate,
	iUserReport,
	iUserUpdate,
	paginationList
} from "../../interfaces/users";
import { profileUserService } from "../../services/session";

const createUserController = async (req: Request, res: Response) => {
	const userData: iUserCreate = req.body;

	const message = await createUserService(userData);

	return res.status(201).json({ message });
};

const listUsersController = (req: Request, res: Response) => {
	const listPagination = req.listPagination;

	const usersPagination: paginationList = listUsersService(listPagination);

	return res.json(usersPagination);
};

const retrieveUserReportController = async (req: Request, res: Response) => {
	const foundUser: iUser = req.foundUser;

	const userReport: iUserReport = await profileUserService(foundUser);
	req.body = userReport;

	generatePDFService(req, res);
};

const updateUserController = async (req: Request, res: Response) => {
	const userData: iUserUpdate = req.body;
	const foundUser: iUser = req.foundUser;

	const updatedUser = await updateUserService(userData, foundUser);

	return res.json(updatedUser);
};

const softDeleteUserController = async (req: Request, res: Response) => {
	const foundUser = req.foundUser;

	await softDeleteUserService(foundUser);

	return res.status(204).json();
};

export {
	listUsersController,
	createUserController,
	updateUserController,
	softDeleteUserController,
	retrieveUserReportController
};
