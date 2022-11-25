import nodemailer from "nodemailer";

const transporder = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export default transporder;
