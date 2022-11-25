import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import { UserRepor } from "../repos/userRepor";
import { existsOrNo } from "../utils/existOrNo";
import { RecoPass } from "../entities/RecoPass";
import { sendEmail } from "../repos/nodemailerRepor";

const userRepor = new UserRepor();

export class AccountController {
	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		try {
			existsOrNo(email, "O E-mail está incorreto");
			existsOrNo(password, "A senha está incorreto");

			let isUserExists = await userRepor.getByEmail(email);
			if (isUserExists == undefined)
				throw { error: "E-mail não cadastrado", statusCode: 400 };

			const comparePassword = await bcrypt.compare(
				password,
				isUserExists.password
			);

			if (!comparePassword) throw { error: "Senha incorreta", statusCode: 400 };

			const payload = {
				id: isUserExists.id,
				email: isUserExists.email,
				first_name: isUserExists.first_name,
				last_name: isUserExists.last_name,
				role: isUserExists.role,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "72h",
			});

			res.status(200).json({ message: "Done!", data: { token, payload } });
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async recoveryPassword(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const user = await userRepor.getById(id);

			if (!user)
				throw {
					statusCode: 500,
					error: "Algum erro aconteceu em nossos serviços. Tente mais tarde",
				};

			const newReco = new RecoPass({ userId: id });

			await userRepor.recovery(newReco);

			await sendEmail({
				to: "hildojesussantosneto@gmail.com",
				subject: "Recuperação de Senha",
				text: "Click no link abaixo",
				html: `<h2>Recuperação de senha</h2> <p>Se não solicitou a troca da sua senha, apenas ignore este email.</p><a href='http://localhost:3333/newPassword?id=${newReco.id}'>Click aqui para criar a nova senha</a>`,
			});

			res.status(200).json({
				message: `Link para atualização da senha foi enviado para o e-mail: ${user.email}`,
			});
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async updatePassword(req: Request, res: Response) {
		const { recoId, password, confirmPassword } = req.body;

		try {
			const recoPass = await userRepor.getRecoveryById(recoId);
			if (recoPass.exp * 1000 < Date.now())
				throw { statusCode: 400, error: "Código expirado. Gere um novo" };

			existsOrNo(password, "A senha não foi definida");
			existsOrNo(confirmPassword, "As senhas não correspondem");

			const isEqual = validator.equals(password, confirmPassword);
			if (!isEqual)
				throw { error: "As senhas não correspondem", statusCode: 400 };

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			await userRepor.update({ password: hash }, recoPass.userId);

			res.status(200).json({ message: "Done!" });
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}
}
