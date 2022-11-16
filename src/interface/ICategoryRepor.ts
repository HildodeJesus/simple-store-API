import { Category } from "../entities/Category";

export interface ICategoryRepor {
	create: (data: Category) => Promise<void>;
	update: (id: string, data: any) => Promise<void>;
	delete: (id: string) => Promise<void>;
	getAll: () => Promise<Category[]>;
	getById: (id: string) => Promise<Category | undefined>;
}
