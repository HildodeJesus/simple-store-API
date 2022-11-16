import knex from "../config/knex";
import { Product } from "../entities/Product";
import { IProductRepor } from "../interface/IProductRepor";

export class ProductRepository implements IProductRepor {
	async create(data: Product): Promise<void> {
		try {
			await knex("products").insert(data);
			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}
	async update(data: any, id: string): Promise<void> {
		try {
			await knex("products").where({ id: id }).update(data);
			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}
	async delete(id: string): Promise<void> {
		try {
			await knex("products").where({ id: id }).delete();
			return;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}
	async getAll(option: any): Promise<Product[]> {
		try {
			if (option.limit) {
				const products: Product[] = await knex("products")
					.select(["id", "name", "salePrice", "imgDefault", "stock"])
					.orderBy("name", option.order)
					.limit(option.limit);

				return products;
			}

			const products: Product[] = await knex("products")
				.select(["id", "name", "salePrice", "imgDefault", "stock"])
				.orderBy("name", option.order);

			return products;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async getById(id: string): Promise<Product> {
		try {
			const products: Product[] = await knex("products")
				.select(
					"id",
					"name",
					"description",
					"salePrice",
					"imgDefault",
					"options",
					"stock"
				)
				.where({ id: id });

			return products[0];
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}

	async getByCategory(categoryId: string, opt: any): Promise<Product[]> {
		try {
			if (opt.limit) {
				const products = await knex("products")
					.select("id", "name", "salePrice", "imgDefault", "stock")
					.where({ categoryId: categoryId })
					.orderBy(opt.order);

				return products;
			}

			const products = await knex("products")
				.select("id", "name", "salePrice", "imgDefault", "stock")
				.where({ categoryId: categoryId })
				.orderBy(opt.order);

			return products;
		} catch (err) {
			throw { error: err, statusCode: 500 };
		}
	}
}
