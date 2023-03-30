export default {
	userAdmin: {
		fullName: "Alex Andre",
		email: "alex@kenzie.com.br",
		telephone: "75987456922",
		password: "123456",
		role: "admin"
	},
	userClientWithoutRole: {
		fullName: "Miguel Sousa",
		email: "miguel@mail.com",
		telephone: "75988758998",
		password: "123456"
	},
	userClientComplete: {
		fullName: "Isabelly Ribeiro",
		email: "isa@mail.com",
		telephone: "75983479825",
		password: "123456",
		role: "client"
	},
	userUnique: {
		fullName: "Thallyson",
		email: "tato@mail.com",
		telephone: "75981997236",
		password: "123456"
	},
	userInvalidBody: {
		fullName: 1234,
		email: []
	},
	userInvalidBody2: {
		fullName: "um nome com mais de cinquenta caracteres informado!",
		email: "mail",
		telephone: "759819972360",
		password: 123456,
		role: "manager"
	}
};
