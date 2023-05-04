import "dotenv/config";
import jwt from "jsonwebtoken";
import { sendEmailService } from "../../utils";
import { iUser } from "../../interfaces/users";
import { userRepository } from "../../repositories";
import { standardEmailTemplate } from "../../utils/templates";

const sendConfirmationEmailService = async (user: iUser) => {
	const confirmationToken = jwt.sign(
		{
			service: "confirm email"
		},
		process.env.SECRET_KEY!,
		{
			subject: user.id,
			expiresIn: "1h"
		}
	);

	user.confirmationToken = confirmationToken;

	await userRepository.save(user);

	const frontURL = process.env.FRONT_URL!;
	const token = confirmationToken.split(".")[2];

	const template = {
		baseURL: frontURL,
		email: user.email,
		name: user.fullName,
		btnText: "Confirmar e-mail",
		subject: "Por favor, confirme sua conta",
		btnLink: `${frontURL}confirm_email/${token}`,
		instructions:
			"Clique no botão abaixo para confirmar o e-mail da sua conta:",
		intro:
			"Seja bem vindo(a) a Blist! Para usurfruir de nossos recursos é necessário a confirmação do e-mail informado  na conta.\nSeu link é válido por 1h.",
		outro:
			"Se você não fez nenhuma conta conosco, não é necessária nenhuma outra ação de sua parte."
	};

	const emailTemplate = standardEmailTemplate(template);

	await sendEmailService(emailTemplate);
};

export default sendConfirmationEmailService;
