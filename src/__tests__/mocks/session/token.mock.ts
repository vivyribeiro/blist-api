import { sign } from "jsonwebtoken";

const secretKey: string = "1234";
process.env.SECRET_KEY = secretKey;

export default {
	genToken: (role: string, id: string) => {
		return sign({ role }, secretKey, { subject: id });
	},
	invalidSignature: sign({ role: "admin" }, "invalid_signature"),
	jwtMalformed: "12345"
};
