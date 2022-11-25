import transporder from "../config/nodemailer";

type EmailConfig = {
	to: string;
	subject: string;
	text: string;
	html: string;
};

export async function sendEmail(config: EmailConfig) {
	try {
		const message = await transporder.sendMail({
			from: "Equipe Hildo <team.hildo@gmail.com>",
			to: config.to,
			subject: config.subject,
			text: config.text,
			html: config.html,
		});

		return { status: true, message };
	} catch (err) {
		return { status: false, err };
	}
}
