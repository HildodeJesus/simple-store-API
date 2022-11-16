import { v4 } from "uuid";
import { dateNow } from "../utils/handleDate";

export class Category {
	public readonly id: string;
	public name: string;
	public img?: string;
	public readonly createdAt?: string;
	public updatedAt?: string;

	constructor(
		props: Omit<Category, "id" | "createdAt" | "updatedAt">,
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
