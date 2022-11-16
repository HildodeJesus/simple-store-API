import knex from "../config/knex";
import { Category } from "../entities/Category";
import { ICategoryRepor } from "../interface/ICategoryRepor";

export class CategoryRepor implements ICategoryRepor {
	async create(data: Category): Promise<void> {
		try {
			await knex("categories").insert(data);
			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async update(data: any, id: string): Promise<void> {
		try {
			await knex("categories").where({ id: id }).update(data);
			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await knex("categories").where({ id: id }).delete();
			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async getAll(): Promise<Category[]> {
		try {
			const categories: Category[] = await knex("categories").select();

			return categories;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async getById(id: string): Promise<Category | undefined> {
		try {
			const categories: Category[] = await knex("categories")
				.select()
				.where({ id: id });

			return categories[0];
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}
}
