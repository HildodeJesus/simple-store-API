export function existsOrNo(data: any, msg: string) {
	if (data == "" || data == undefined) throw { error: msg, statusCode: 400 };
	if (Array.isArray(data) && data.length == 0)
		throw { error: msg, statusCode: 400 };
}
