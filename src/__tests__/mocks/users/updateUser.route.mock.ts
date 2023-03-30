export default {
	userAdminTemplate: {
		fullName: "Alex Andre",
		email: "alex@kenzie.com.br",
		telephone: "75987456922",
		password: "123456",
		role: "admin"
	},
	userClientTemplate: {
		fullName: "Isabelly Ribeiro",
		email: "isa@mail.com",
		telephone: "75983479825",
		password: "123456"
	},
	userComplete: {
		fullName: "Isabelly Patched",
		email: "isa@mail.com",
		telephone: "75983479825"
	},
	userPartial: {
		password: "12345678"
	},
	userAdmin: {
		password: "12345678",
		admin: true
	},
	userUniqueEmail: {
		fullName: "Thallyson Unique",
		email: "tato@mail.com",
		telephone: "75981997220",
		password: "123456"
	},
	userUniqueTelephone: {
		fullName: "Thallyson Unique",
		email: "tato.unique@mail.com",
		telephone: "75981997236",
		password: "123456"
	},
	userUniqueEmailAndTelephone: {
		fullName: "Thallyson Unique",
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
