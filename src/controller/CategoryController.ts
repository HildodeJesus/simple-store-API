import { Request, Response } from "express";
import { Category } from "../entities/Category";
import { CategoryRepor } from "../repos/categoryRepor";
import { existsOrNo } from "../utils/existOrNo";

const categoryRepor = new CategoryRepor();

export class CategoryController {
	async newCategory(req: Request, res: Response) {
		const body: Omit<Category, "createdAt" | "updatedAt"> = req.body;

		try {
			existsOrNo(body.name, "Defina um nome");
			const category = new Category(body);

			await categoryRepor.create(category);

			res.status(200).json("Sucess");
		} catch (err) {
			res.status(err.statusCode).json(err);
		}
	}

	async getAllCategories(req: Request, res: Response) {
		try {
			const categories = await categoryRepor.getAll();

			res.status(200).json(categories);
		} catch (err) {
			res.status(err.statusCode).json(err);
		}
	}
}
