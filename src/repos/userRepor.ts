import { User } from "../entities/User";
import { IUserRepor } from "../interface/IUserRepor";

import dbKnex from "../config/knex";
import { RecoPass } from "../entities/RecoPass";

export class UserRepor implements IUserRepor {
	async create(data: User): Promise<void> {
		try {
			await dbKnex("users").insert(data);
			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}
	async update(data: any, id: string): Promise<void> {
		try {
			console.log(data, id);
			await dbKnex("users").where({ id: id }).update(data);
			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async recovery(data: any) {
		try {
			await dbKnex("recovery_password").insert(data);

			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async getRecoveryById(id: string) {
		try {
			const reco: RecoPass[] = await dbKnex("recovery_password")
				.select(["id", "userId", "exp"])
				.where({ id: id });

			return reco[0];
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await dbKnex("users").where({ id: id }).delete();
			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async getAll(config: any): Promise<User[]> {
		try {
			const users: Omit<User[], "password"> = await dbKnex("users")
				.select("id", "first_name", "last_name", "email", "role")
				.orderBy("first_name", config.order)
				.limit(config.limit);

			return users;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async getById(id: string): Promise<User> {
		try {
			const users: Omit<User[], "password"> = await dbKnex("users")
				.select("id", "first_name", "last_name", "email", "role")
				.where({ id: id });

			if (users.length == 0) return undefined;

			return users[0];
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}
	async getByEmail(email: string): Promise<User | undefined> {
		try {
			const users: User[] = await dbKnex("users")
				.select("id", "first_name", "last_name", "email", "role", "password")
				.where({ email: email });

			if (users.length == 0) return undefined;

			return users[0];
		} catch (err) {
			return undefined;
		}
	}
}
