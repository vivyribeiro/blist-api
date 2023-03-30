export default {
	contact1: {
		fullName: "Sandro Silva",
		email: "sandro@gmail.com",
		telephone: "75981123456",
		createdAt: expect.any(String),
		updatedAt: expect.any(String)
	},
	contact2: {
		fullName: "Kelly Santos",
		email: "kellys@gmail.com",
		telephone: "75997876543",
		createdAt: expect.any(String),
		updatedAt: expect.any(String)
	},
	contactUnique: {
		fullName: "Antônia Nascimento",
		email: "tonha@gmail.com",
		telephone: "75990302010",
		createdAt: expect.any(String),
		updatedAt: expect.any(String)
	},
	contactInvalidBody: {
		fullName: 1234,
		email: []
	},
	contactInvalidBody2: {
		fullName: "um nome com mais de cinquenta caracteres informado!",
		email: "mail",
		telephone: "759819972360"
	}
};
