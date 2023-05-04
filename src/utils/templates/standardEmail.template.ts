import mailGenerator from "../mailGenerator.utils";
import { iEmailTemplate } from "../../interfaces/mailHandler";

const standardEmailTemplate = ({
	baseURL,
	name,
	email,
	intro,
	instructions,
	btnText,
	btnLink,
	outro,
	subject
}: iEmailTemplate) => {
	const mailManager = mailGenerator(baseURL);

	const emailconfig = {
		body: {
			greeting: "Olá",
			name,
			intro,
			action: {
				instructions,
				button: {
					color: "#000d42",
					text: btnText,
					link: btnLink
				}
			},
			outro,
			signature: false
		}
	};

	const emailBody = mailManager.generate(emailconfig);

	const emailTemplate = {
		to: email,
		subject,
		text: emailBody
	};

	return emailTemplate;
};

export default standardEmailTemplate;
