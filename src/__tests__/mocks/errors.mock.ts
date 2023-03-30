export default {
	missingBearer: { error: { message: "Missing bearer token" }, status: 401 },
	invalidSignature: { error: { message: "invalid signature" }, status: 401 },
	jwtMalformed: { error: { message: "jwt malformed" }, status: 401 },
	forbidden: {
		error: { message: "You do not have permission to perform this action." },
		status: 403
	},
	notFound: {
		user: { error: { message: "User was not found" }, status: 404 },
		contact: { error: { message: "Contact was not found" }, status: 404 }
	},
	conflitData: {
		email: {
			error: { message: "The email already exists" },
			status: 409
		},
		telephone: {
			error: { message: "The telephone already exists" },
			status: 409
		},
		emailAndTelephone: {
			error: { message: "The email and telephone already exists" },
			status: 409
		}
	}
};
