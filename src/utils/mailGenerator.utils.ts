import Mailgen from "mailgen";

const mailGenerator = (baseURL: string) => {
	return new Mailgen({
		theme: "default",
		product: {
			name: "Blist",
			link: baseURL,
			logo: "https://raw.githubusercontent.com/vivyribeiro/blist-api/main/documentation/logo.png"
		}
	});
};

export default mailGenerator;
