import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors";
import { sendEmailService } from "../../utils";
import { userRepository } from "../../repositories";
import { standardEmailTemplate } from "../../utils/templates";

const sendResetPasswordEmailService = async (
	email: string
): Promise<String> => {
	const user = await userRepository.findOne({
		where: {
			email
		}
	});

	if (!user) {
		throw new AppError("user not found", 404);
	}

	const resetToken = jwt.sign(
		{
			service: "reset password"
		},
		process.env.SECRET_KEY!,
		{
			subject: user.id,
			expiresIn: "1h"
		}
	);

	user.resetToken = resetToken;
	await userRepository.save(user);

	const frontURL = process.env.FRONT_URL!;
	const token = resetToken.split(".")[2];

	const template = {
		baseURL: frontURL,
		email: user.email,
		name: user.fullName,
		btnText: "Redefinir senha",
		subject: "Redefinição de senha",
		btnLink: `${frontURL}/reset_password/${token}`,
		instructions: "Clique no botão abaixo para redefinir sua senha:",
		intro:
			"Você recebeu este e-mail porque foi enviado um pedido de redefinição de senha para sua conta. Não esqueça, esse link é válido somente por 1h.",
		outro:
			"Se você não solicitou uma redefinição de senha, não é necessária nenhuma outra ação de sua parte."
	};

	const emailTemplate = standardEmailTemplate(template);

	return await sendEmailService(emailTemplate);
};

export default sendResetPasswordEmailService;
