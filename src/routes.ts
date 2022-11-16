import { Router } from "express";

import { CategoryController } from "./controller/CategoryController";
import { ProductController } from "./controller/ProductController";

const router = Router();

const productController = new ProductController();
const categoryController = new CategoryController();

router
	.route("/products")
	.post(productController.newProduct)
	.get(productController.getAllProducts);

router
	.route("/products/:id")
	.get(productController.getOneProduct)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct);

router
	.route("/:categoryId/products")
	.get(productController.getProductsByCategory);

router
	.route("/categories")
	.post(categoryController.newCategory)
	.get(categoryController.getAllCategories);

export default router;
