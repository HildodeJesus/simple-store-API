import { RecoPass } from "../entities/RecoPass";
import { User } from "../entities/User";

export interface IUserRepor {
	create: (data: User) => Promise<void>;
	update: (data: any, id: string) => Promise<void>;
	delete: (id: string) => Promise<void>;
	getAll: (config: any) => Promise<User[]>;
	getById: (id: string) => Promise<User>;
	getByEmail: (email: string) => Promise<User>;
	recovery: (data: any) => Promise<void>;
	getRecoveryById: (id: string) => Promise<RecoPass>;
}
