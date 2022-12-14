import { v4 } from "uuid";
import { dateNow } from "../utils/handleDate";

export class User {
	public readonly id: string;
	public first_name: string;
	public last_name: string;
	public email: string;
	public password: string;
	public role: number;
	public readonly createdAt: string;
	public updatedAt: string;

	constructor(
		props: Omit<User, "id" | "createdAt" | "updatedAt">,
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
