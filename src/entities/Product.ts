import { v4 } from "uuid";
import { dateNow } from "../utils/handleDate";

export class Product {
	public readonly id: string;
	public name: string;
	public description: string;
	public salePrice: number;
	public purchasePrice: number;
	public imgDefault: string;
	public options: any;
	public stock: number;
	public categoryId: string;
	public readonly createdAt?: string;
	public updatedAt?: string;

	constructor(
		props: Omit<Product, "id" | "createdAt" | "updatedAt">,
		id?: string,
		updatedAt?: string
	) {
		Object.assign(this, props);

		this.createdAt = dateNow();

		if (!updatedAt) {
			this.updatedAt = dateNow();
		}

		if (!id) {
			this.id = v4();
		}
	}
}
