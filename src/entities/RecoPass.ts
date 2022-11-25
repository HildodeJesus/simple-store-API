import { v1, v4 } from "uuid";
import { dateNow } from "../utils/handleDate";

export class RecoPass {
	public readonly id: string;
	public readonly exp: number;
	public userId: string;
	public readonly createdAt: string;

	constructor(props: Omit<RecoPass, "id" | "createdAt" | "exp">) {
		Object.assign(this, props);

		if (!this.id) this.id = v4();
		if (!this.exp) this.exp = (Date.now() + 1800000) / 1000;
		if (!this.createdAt) this.createdAt = dateNow();
	}
}
