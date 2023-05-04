interface iEmailTemplate {
	name: string;
	intro: string;
	email: string;
	outro: string;
	btnText: string;
	btnLink: string;
	baseURL: string;
	subject: string;
	instructions: string;
}

interface iSendEmailRequest {
	to: string;
	text: string;
	subject: string;
	htmlText?: string;
}

interface iUserResetPasswordService {
	token: string;
	password: string;
}

export { iEmailTemplate, iSendEmailRequest, iUserResetPasswordService };
