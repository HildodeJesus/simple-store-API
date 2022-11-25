import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
	const authorization = req.headers["authorization"];

	const token = authorization.split(" ")[1];
	const verify: any = jwt.verify(token, process.env.JWT_SECRET);

	if (verify.exp * 1000 < Date.now()) next();

	res.json({ error: false, message: "Faça login novamente" });
}
