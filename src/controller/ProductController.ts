import { Request, Response } from "express";
import { Product } from "../entities/Product";
import { CategoryRepor } from "../repos/categoryRepor";
import { ProductRepository } from "../repos/productRepor";
import { existsOrNo } from "../utils/existOrNo";
import { arrayToCls, clsToArray } from "../utils/treatOptions";

const productRepor = new ProductRepository();
const categoryRepor = new CategoryRepor();

export class ProductController {
	async newProduct(req: Request, res: Response) {
		const body: Omit<Product, "id" | "createdAt" | "updatedAt"> = req.body;

		try {
			existsOrNo(body.name, "Nome do produto não definido");
			existsOrNo(body.salePrice, "Valor do produto não definido");
			existsOrNo(body.purchasePrice, "Custo do produto não definido");
			existsOrNo(body.options, "Opções do produto não definido");
			existsOrNo(body.stock, "Estoque do produto não definido");
			existsOrNo(body.categoryId, "Categoria que o produto pertence");
			existsOrNo(body.description, "Descrição do produto não definido");

			let isExistsCategory = await categoryRepor.getById(body.categoryId);
			if (!isExistsCategory)
				throw { error: "Categoria não existe", statusCode: 400 };

			const newProduct = new Product({
				...body,
				options: arrayToCls(body.options),
			});

			await productRepor.create(newProduct);

			res.status(200).json({ message: "Done!" });
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async updateProduct(req: Request, res: Response) {
		const id = req.params.id;
		const body: Product = req.body;

		const updatedProduct = { ...body };

		try {
			const product = await productRepor.getById(id);
			if (!product) throw { error: "Produto não existe", statusCode: 400 };

			await productRepor.update(updatedProduct, id);

			res.status(201).json({
				message: "Done!",
			});
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async getAllProducts(req: Request, res: Response) {
		const { limit, order } = req.query;
		try {
			const products = await productRepor.getAll({
				limit: limit ? limit : undefined,
				order: order ? order : "desc",
			});

			res.status(200).json({
				message: "Done!",
				products,
			});
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async getOneProduct(req: Request, res: Response) {
		const id = req.params.id;

		try {
			const product = await productRepor.getById(id);
			if (!product) throw { error: "Produto não existe", statusCode: 400 };

			const treatProduct = {
				...product,
				description: product.description.toString(),
				options: clsToArray(product.options),
			};

			res.status(200).json({ message: "Done!", product: treatProduct });
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async getProductsByCategory(req: Request, res: Response) {
		const { limit, order } = req.query;
		const categoryId = req.params.categoryId;

		try {
			const products: Product[] = await productRepor.getByCategory(categoryId, {
				limit: limit || undefined,
				order: order || "desc",
			});
			if (!products) {
				throw {
					statusCode: 400,
					message: "Não encontramos produtos relacionados com essa categoria",
				};
			}

			res.status(200).json({ massage: "Done!", products });
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}

	async deleteProduct(req: Request, res: Response) {
		const id = req.params.id;
		try {
			const isExistsProduct = await productRepor.getById(id);
			if (!isExistsProduct)
				throw {
					statusCode: 400,
					message: "Produto não existe no Banco de Dados",
				};

			await productRepor.delete(id);

			res.status(200).json({ message: "Done!" });
		} catch (err) {
			res.status(err.statusCode).json({ error: err });
		}
	}
}
