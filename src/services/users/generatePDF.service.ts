import PDFPrinter from "pdfmake";
import { Request, Response } from "express";
import { iUserReport } from "../../interfaces/users";
import { TDocumentDefinitions, TableCell } from "pdfmake/interfaces";

const generatePDFService = (req: Request, res: Response) => {
	const { fullName, email, telephone, contacts }: iUserReport = req.body;

	const fonts = {
		Helvetica: {
			normal: "Helvetica",
			bold: "Helvetica-Bold",
			italics: "Helvetica-Oblique",
			bolditalics: "Helvetica-BoldOblique"
		}
	};

	const printer = new PDFPrinter(fonts);

	const dateReport = new Date().toLocaleDateString("pt-br", {
		year: "numeric",
		month: "numeric",
		day: "numeric"
	});

	const userTableTitles: TableCell[] = [
		{ text: "Nome", style: "tableHeader" },
		{ text: "Email", style: "tableHeader" },
		{ text: "Telefone", style: "tableHeader" }
	];

	const contactsTableTitle: TableCell[] = [
		{ text: "Id", style: "tableHeader" },
		{ text: "Nome", style: "tableHeader" },
		{ text: "Email", style: "tableHeader" },
		{ text: "Telefone", style: "tableHeader" }
	];

	const contactsValues = [];

	if (contacts.length) {
		for (let contact of contacts) {
			const rows = [];

			rows.push(contact.id);
			rows.push(contact.fullName);
			rows.push(contact.email);
			rows.push(contact.telephone);

			contactsValues.push(rows);
		}
	}

	const docDefinitions: TDocumentDefinitions = {
		defaultStyle: { font: "Helvetica" },
		pageOrientation: "landscape",
		header: {
			text: `Gerado em: ${dateReport}`,
			alignment: "right",
			margin: 15,
			fontSize: 12
		},
		footer: {
			columns: [
				{
					text: "Blist",
					alignment: "center",
					color: "#000d42",
					fontSize: 15,
					bold: true,
					marginBottom: 25
				}
			]
		},
		content: [
			{
				text: "Relatório de Contatos",
				style: "header",
				alignment: "center",
				marginTop: 15
			},
			{
				text: "Dados do Responsável",
				style: "subheader"
			},
			{
				style: "tableStyled",
				table: {
					widths: "auto",
					headerRows: 1,
					body: [userTableTitles, [`${fullName}`, `${email}`, `${telephone}`]]
				}
			},
			{
				text: "Lista de Contatos",
				style: "subheader",
				marginTop: 25
			},
			contacts.length
				? {
						style: "tableStyled",
						table: {
							body: [contactsTableTitle, ...contactsValues]
						}
				  }
				: {
						text: "Não há contatos cadastrados",
						style: "subheader",
						color: "#000d42",
						marginTop: 25
				  }
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				margin: [0, 0, 0, 10]
			},
			subheader: {
				fontSize: 16,
				bold: true,
				margin: [0, 10, 0, 5]
			},
			tableStyled: {
				margin: [0, 10, 0, 10]
			},
			tableHeader: {
				bold: true,
				fontSize: 14,
				color: "white",
				alignment: "center",
				fillColor: "#000d42"
			}
		}
	};

	const pdfDoc = printer.createPdfKitDocument(docDefinitions);

	const chunks: Buffer[] = [];

	pdfDoc.on("data", chunk => {
		chunks.push(chunk);
	});

	pdfDoc.end();

	pdfDoc.on("end", () => {
		const bufferData = Buffer.concat(chunks);
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader("Content-Disposition", "attachment; filename=Relatório.pdf");
		res.end(bufferData);
	});
};

export default generatePDFService;
