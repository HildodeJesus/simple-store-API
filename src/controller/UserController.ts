import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";

import { User } from "../entities/User";
import { UserRepor } from "../repos/userRepor";
import { existsOrNo } from "../utils/existOrNo";
import { dateNow } from "../utils/handleDate";

const userRepor = new UserRepor();

export class UserController {
	async create(req: Request, res: Response) {
		const { first_name, last_name, email, password, confirmPassword, role } =
			req.body;

		try {
			existsOrNo(first_name, "O primeiro nome não foi definido");
			existsOrNo(last_name, "O último nome não foi definido");
			existsOrNo(email, "O E-mail não foi definido");
			existsOrNo(password, "A senha não foi definida");
			existsOrNo(confirmPassword, "As senhas não correspondem");

			const isEqual = validator.equals(password, confirmPassword);
			if (!isEqual)
				throw { error: "As senhas não correspondem", statusCode: 400 };

			const isEmail = validator.isEmail(email);
			if (!isEmail) throw { error: "E-mail inválido", statusCode: 400 };

			const isExistUser: User = await userRepor.getByEmail(email);
			if (isExistUser != undefined)
				throw { error: "E-mail já está cadastrado", statusCode: 400 };

			const salt = await bcrypt.genSalt(10);
			const hashPass = await bcrypt.hash(password, salt);

			const user = new User({
				first_name,
				last_name,
				email,
				password: hashPass,
				role,
			});

			await userRepor.create(user);

			res.status(201).json({
				message: "Done!",
			});
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async update(req: Request, res: Response) {
		const body: User = { ...req.body };
		const id = req.params.id;
		const userUpdated: any = {};

		try {
			if (body.first_name) userUpdated.first_name == body.first_name;
			if (body.last_name) userUpdated.last_name == body.last_name;
			if (body.role) userUpdated.role == body.role;

			if (body.email) {
				const isEmail = validator.isEmail(body.email);
				if (!isEmail) throw { error: "E-mail inválido", statusCode: 400 };
				userUpdated.email == body.email;
			}

			await userRepor.update({ ...body, updatedAt: dateNow() }, id);

			res.status(200).json({
				message: "Done!",
			});
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async delete(req: Request, res: Response) {
		const id = req.params.id;
		try {
			await userRepor.delete(id);
			res.status(200).json({
				message: "Done!",
			});
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async getAllUsers(req: Request, res: Response) {
		const { limit, order } = req.query;
		try {
			const users = await userRepor.getAll({
				limit: limit || 50,
				order: order || "desc",
			});

			if (users.length === 0)
				throw { message: "Não usuários cadastrados", statusCode: 400 };

			res.status(200).json({
				message: "Done!",
				users,
			});
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async getOneUser(req: Request, res: Response) {
		const id = req.params.id;
		try {
			const user = await userRepor.getById(id);

			res.status(201).json({ message: "Done!", user });
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}
}
