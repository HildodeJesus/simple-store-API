import { Product } from "../entities/Product";

export interface IProductRepor {
	create: (data: Product) => Promise<void>;
	update: (id: string, data: any) => Promise<void>;
	delete: (id: string) => Promise<void>;
	getAll: (
		option: any
	) => Promise<Omit<Product[], "description" | "purchasePrice" | "options">>;
	getById: (id: string) => Promise<Product | undefined>;
	getByCategory: (
		categoryId: string,
		opt: object
	) => Promise<Omit<Product[], "description" | "purchasePrice" | "options">>;
}
