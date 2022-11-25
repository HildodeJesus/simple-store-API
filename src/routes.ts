import { Router } from "express";
import { AccountController } from "./controller/AccountController";

import { CategoryController } from "./controller/CategoryController";
import { ProductController } from "./controller/ProductController";
import { UserController } from "./controller/UserController";
import auth from "./middlewares/auth";

const router = Router();

const productController = new ProductController();
const categoryController = new CategoryController();
const userController = new UserController();
const accountController = new AccountController();

router.post("/login", accountController.login);
router.get("/recovery/:id", accountController.recoveryPassword);
router.post("/newPassword", accountController.updatePassword);

router
	.route("/users")
	.get(userController.getAllUsers)
	.all(auth)
	.post(userController.create);

router
	.route("/users/:id")
	.all(auth)
	.patch(userController.update)
	.get(userController.getOneUser)
	.delete(userController.delete);

router
	.route("/products")
	.get(productController.getAllProducts)
	.all(auth)
	.post(productController.newProduct);

router
	.route("/products/:id")
	.get(productController.getOneProduct)
	.all(auth)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct);

router
	.route("/:categoryId/products")
	.get(productController.getProductsByCategory);

router
	.route("/categories")
	.get(categoryController.getAllCategories)
	.all(auth)
	.post(categoryController.newCategory);

export default router;
